// Types for our data models
export interface User {
  id: string
  username: string
  email: string
  password: string
  role: "admin" | "student"
  createdAt: string
  // Extended user profile fields
  profilePhoto?: string
  bio?: string
  rollNumber?: string
  contactNumber?: string
  address?: string
  previousSchools?: PreviousSchool[]
  academicMarks?: SemesterMarks[]
  enrolledCourses?: string[] // IDs of enrolled courses
}

export interface PreviousSchool {
  id: string
  name: string
  degree: string
  yearStart: string
  yearEnd: string
}

export interface SemesterMarks {
  id: string
  semester: string
  year: string
  gpa: string
  subjects: SubjectMark[]
}

export interface SubjectMark {
  id: string
  name: string
  grade: string
  credits: number
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  createdAt: string
  updatedAt: string
  credits: number
  semester: string
  year: string
}

export interface EnrolledCourse extends Course {
  status: "Not Started" | "In Progress" | "Completed"
  progress: number
  enrollmentDate: string
}

export interface Notice {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  category?: "General" | "Important" | "Event"
  eventDate?: string
  attachments?: {
    id: string
    name: string
    url: string
    type: string
  }[]
}

export interface Inquiry {
  id: string
  name: string
  email: string
  message: string
  date: string
  status: "Pending" | "Resolved"
}

export interface ActivityLog {
  id: string
  userId: string
  username: string
  action: string
  timestamp: string
  details?: string
}

// Keys for localStorage
const STORAGE_KEYS = {
  USERS: "education_portal_users",
  CURRENT_USER: "education_portal_current_user",
  COURSES: "education_portal_courses",
  NOTICES: "education_portal_notices",
  INQUIRIES: "education_portal_inquiries",
  ACTIVITY_LOGS: "education_portal_activity_logs",
}

// Helper function to safely parse JSON from localStorage
function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  const item = localStorage.getItem(key)
  if (!item) return defaultValue

  try {
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error parsing localStorage item ${key}:`, error)
    return defaultValue
  }
}

// Helper function to safely set JSON to localStorage
function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

// Initialize default data if not exists
const initializeStorage = (): void => {
  if (typeof window === "undefined") return

  // Initialize users if not exists
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers: User[] = [
      {
        id: "1",
        username: "admin",
        email: "admin@example.com",
        password: "admin123", // In a real app, this would be hashed
        role: "admin",
        createdAt: new Date().toISOString(),
        rollNumber: "ADMIN001",
        contactNumber: "+1 (555) 123-4567",
        address: "123 Admin Street, Admin City, 12345",
        bio: "Administrator with 5+ years of experience in educational management.",
      },
      {
        id: "2",
        username: "student",
        email: "student@example.com",
        password: "student123", // In a real app, this would be hashed
        role: "student",
        createdAt: new Date().toISOString(),
        rollNumber: "STU20230001",
        contactNumber: "+1 (555) 987-6543",
        address: "456 Student Avenue, College Town, 54321",
        bio: "Computer Science student passionate about web development and AI.",
        previousSchools: [
          {
            id: "ps1",
            name: "Springfield High School",
            degree: "High School Diploma",
            yearStart: "2018",
            yearEnd: "2022",
          },
        ],
        academicMarks: [
          {
            id: "sem1",
            semester: "Fall",
            year: "2022",
            gpa: "3.8",
            subjects: [
              { id: "sub1", name: "Introduction to Programming", grade: "A", credits: 4 },
              { id: "sub2", name: "Calculus I", grade: "A-", credits: 3 },
              { id: "sub3", name: "English Composition", grade: "B+", credits: 3 },
            ],
          },
        ],
        enrolledCourses: ["1", "2", "3"],
      },
    ]
    setStorageItem(STORAGE_KEYS.USERS, defaultUsers)
  }

  // Initialize courses if not exists
  if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
    const defaultCourses: Course[] = [
      {
        id: "1",
        title: "Introduction to Computer Science",
        description: "Learn the basics of computer science and programming.",
        instructor: "Dr. Alan Turing",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        credits: 4,
        semester: "Fall",
        year: "2023",
      },
      {
        id: "2",
        title: "Web Development Fundamentals",
        description: "Master HTML, CSS, and JavaScript to build modern websites.",
        instructor: "Prof. Tim Berners-Lee",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        credits: 3,
        semester: "Fall",
        year: "2023",
      },
      {
        id: "3",
        title: "Data Structures and Algorithms",
        description: "Learn essential data structures and algorithms for efficient programming.",
        instructor: "Dr. Ada Lovelace",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        credits: 4,
        semester: "Spring",
        year: "2023",
      },
      {
        id: "4",
        title: "Mobile App Development",
        description: "Build native mobile applications for iOS and Android platforms.",
        instructor: "Prof. Steve Jobs",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        credits: 3,
        semester: "Spring",
        year: "2023",
      },
      {
        id: "5",
        title: "Artificial Intelligence Basics",
        description: "Introduction to AI concepts, machine learning, and neural networks.",
        instructor: "Dr. Geoffrey Hinton",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        credits: 4,
        semester: "Fall",
        year: "2023",
      },
    ]
    setStorageItem(STORAGE_KEYS.COURSES, defaultCourses)
  }

  // Initialize notices if not exists
  if (!localStorage.getItem(STORAGE_KEYS.NOTICES)) {
    const defaultNotices: Notice[] = [
      {
        id: "1",
        title: "Welcome to the New Semester",
        content:
          "We are excited to welcome all students to the new academic semester. Please check your course schedules and make sure you have all the required materials for your classes. If you have any questions, feel free to contact the administration office.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: "General",
      },
      {
        id: "2",
        title: "Important: Final Exam Schedule",
        content:
          "The final examination schedule for the current semester has been published. Please review the schedule carefully and note the dates, times, and locations of your exams. If you have any conflicts, please contact the examination office immediately to make alternative arrangements.",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        category: "Important",
        attachments: [
          {
            id: "att1",
            name: "Final_Exam_Schedule.pdf",
            url: "#",
            type: "application/pdf",
          },
        ],
      },
      {
        id: "3",
        title: "Campus Career Fair",
        content:
          "The annual Campus Career Fair will be held next month. This is a great opportunity to meet potential employers, explore internship opportunities, and network with industry professionals. All students are encouraged to attend and bring their resumes. Professional attire is recommended.",
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        category: "Event",
        eventDate: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days from now
        attachments: [
          {
            id: "att2",
            name: "Career_Fair_Companies.pdf",
            url: "#",
            type: "application/pdf",
          },
          {
            id: "att3",
            name: "Campus_Map.jpg",
            url: "#",
            type: "image/jpeg",
          },
        ],
      },
      {
        id: "4",
        title: "Library Hours Extended During Finals Week",
        content:
          "To support students during the final examination period, the university library will extend its operating hours. The library will be open 24 hours a day from Monday to Friday during finals week. Additional study spaces will also be available throughout the campus.",
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
        updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        category: "General",
      },
      {
        id: "5",
        title: "Scholarship Applications Now Open",
        content:
          "Applications for the next academic year scholarships are now open. Students with strong academic performance are encouraged to apply. The application deadline is in two months. Please visit the financial aid office or the university website for more information and application forms.",
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
        updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        category: "Important",
        attachments: [
          {
            id: "att4",
            name: "Scholarship_Application_Form.docx",
            url: "#",
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          },
        ],
      },
    ]
    setStorageItem(STORAGE_KEYS.NOTICES, defaultNotices)
  }

  // Initialize inquiries if not exists
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    setStorageItem(STORAGE_KEYS.INQUIRIES, [])
  }

  // Initialize activity logs if not exists
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS)) {
    setStorageItem(STORAGE_KEYS.ACTIVITY_LOGS, [])
  }
}

// User Authentication Functions
const login = (username: string, password: string): User | null => {
  const users = getStorageItem<User[]>(STORAGE_KEYS.USERS, [])
  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    // Store current user in localStorage
    setStorageItem(STORAGE_KEYS.CURRENT_USER, user)

    // Log the activity
    addActivityLog({
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      action: "Login",
      timestamp: new Date().toISOString(),
    })

    return user
  }

  return null
}

const register = (userData: Omit<User, "id" | "createdAt">): User => {
  const users = getStorageItem<User[]>(STORAGE_KEYS.USERS, [])

  // Check if username or email already exists
  const existingUser = users.find((u) => u.username === userData.username || u.email === userData.email)
  if (existingUser) {
    throw new Error("Username or email already exists")
  }

  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  setStorageItem(STORAGE_KEYS.USERS, users)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: newUser.id,
    username: newUser.username,
    action: "Register",
    timestamp: new Date().toISOString(),
  })

  return newUser
}

const logout = (): void => {
  const currentUser = getCurrentUser()

  if (currentUser) {
    // Log the activity before removing the user
    addActivityLog({
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      action: "Logout",
      timestamp: new Date().toISOString(),
    })
  }

  // Remove current user from localStorage
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
}

const getCurrentUser = (): User | null => {
  return getStorageItem<User | null>(STORAGE_KEYS.CURRENT_USER, null)
}

const getAllUsers = (): User[] => {
  return getStorageItem<User[]>(STORAGE_KEYS.USERS, [])
}

// User Profile Functions
const updateUserProfile = (userId: string, profileData: Partial<User>): User | null => {
  const users = getAllUsers()
  const currentUser = getCurrentUser()

  if (!currentUser) {
    throw new Error("Unauthorized: You must be logged in to update your profile")
  }

  // Only allow users to update their own profile unless they're an admin
  if (userId !== currentUser.id && currentUser.role !== "admin") {
    throw new Error("Unauthorized: You can only update your own profile")
  }

  const userIndex = users.findIndex((user) => user.id === userId)
  if (userIndex === -1) return null

  // Don't allow changing role or other sensitive fields
  const { role, password, id, createdAt, ...allowedUpdates } = profileData

  const updatedUser: User = {
    ...users[userIndex],
    ...allowedUpdates,
  }

  users[userIndex] = updatedUser
  setStorageItem(STORAGE_KEYS.USERS, users)

  // If updating the current user, update the current user in localStorage
  if (userId === currentUser.id) {
    setStorageItem(STORAGE_KEYS.CURRENT_USER, updatedUser)
  }

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Update Profile",
    timestamp: new Date().toISOString(),
    details: `Updated user profile for ${updatedUser.username}`,
  })

  return updatedUser
}

const deleteUserAccount = (userId: string): boolean => {
  const users = getAllUsers()
  const currentUser = getCurrentUser()

  if (!currentUser) {
    throw new Error("Unauthorized: You must be logged in to delete an account")
  }

  // Only allow users to delete their own account unless they're an admin
  if (userId !== currentUser.id && currentUser.role !== "admin") {
    throw new Error("Unauthorized: You can only delete your own account")
  }

  const userToDelete = users.find((user) => user.id === userId)
  if (!userToDelete) return false

  const updatedUsers = users.filter((user) => user.id !== userId)
  setStorageItem(STORAGE_KEYS.USERS, updatedUsers)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Delete Account",
    timestamp: new Date().toISOString(),
    details: `Deleted account for ${userToDelete.username}`,
  })

  // If deleting the current user, log them out
  if (userId === currentUser.id) {
    logout()
  }

  return true
}

// Course Management Functions
const getAllCourses = (): Course[] => {
  return getStorageItem<Course[]>(STORAGE_KEYS.COURSES, [])
}

const getCourseById = (id: string): Course | undefined => {
  const courses = getAllCourses()
  return courses.find((course) => course.id === id)
}

// Get enrolled courses for a specific user
const getEnrolledCoursesForUser = (userId: string): EnrolledCourse[] => {
  const users = getAllUsers()
  const courses = getAllCourses()

  const user = users.find((u) => u.id === userId)
  if (!user || !user.enrolledCourses) return []

  const enrolledCourses: EnrolledCourse[] = []

  for (const courseId of user.enrolledCourses) {
    const course = courses.find((c) => c.id === courseId)
    if (course) {
      // Generate random progress for demo purposes
      const progress = Math.floor(Math.random() * 100)
      let status: "Not Started" | "In Progress" | "Completed" = "Not Started"

      if (progress > 0 && progress < 100) {
        status = "In Progress"
      } else if (progress === 100) {
        status = "Completed"
      }

      enrolledCourses.push({
        ...course,
        status,
        progress,
        enrollmentDate: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(), // Random date within last 30 days
      })
    }
  }

  return enrolledCourses
}

// Enroll a user in a course
const enrollUserInCourse = (userId: string, courseId: string): boolean => {
  const users = getAllUsers()
  const courses = getAllCourses()

  const userIndex = users.findIndex((u) => u.id === userId)
  if (userIndex === -1) return false

  const course = courses.find((c) => c.id === courseId)
  if (!course) return false

  const user = users[userIndex]
  const enrolledCourses = user.enrolledCourses || []

  // Check if already enrolled
  if (enrolledCourses.includes(courseId)) return true

  // Add course to user's enrolled courses
  users[userIndex] = {
    ...user,
    enrolledCourses: [...enrolledCourses, courseId],
  }

  setStorageItem(STORAGE_KEYS.USERS, users)

  // If updating the current user, update the current user in localStorage
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.id === userId) {
    setStorageItem(STORAGE_KEYS.CURRENT_USER, users[userIndex])
  }

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId,
    username: user.username,
    action: "Enroll in Course",
    timestamp: new Date().toISOString(),
    details: `Enrolled in course: ${course.title}`,
  })

  return true
}

const addCourse = (courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Course => {
  const courses = getAllCourses()
  const currentUser = getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized: Only admins can add courses")
  }

  const newCourse: Course = {
    ...courseData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  courses.push(newCourse)
  setStorageItem(STORAGE_KEYS.COURSES, courses)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Add Course",
    timestamp: new Date().toISOString(),
    details: `Added course: ${newCourse.title}`,
  })

  return newCourse
}

const updateCourse = (
  id: string,
  courseData: Partial<Omit<Course, "id" | "createdAt" | "updatedAt">>,
): Course | null => {
  const courses = getAllCourses()
  const currentUser = getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized: Only admins can update courses")
  }

  const courseIndex = courses.findIndex((course) => course.id === id)
  if (courseIndex === -1) return null

  const updatedCourse: Course = {
    ...courses[courseIndex],
    ...courseData,
    updatedAt: new Date().toISOString(),
  }

  courses[courseIndex] = updatedCourse
  setStorageItem(STORAGE_KEYS.COURSES, courses)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Update Course",
    timestamp: new Date().toISOString(),
    details: `Updated course: ${updatedCourse.title}`,
  })

  return updatedCourse
}

const deleteCourse = (id: string): boolean => {
  const courses = getAllCourses()
  const currentUser = getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized: Only admins can delete courses")
  }

  const courseToDelete = courses.find((course) => course.id === id)
  if (!courseToDelete) return false

  const updatedCourses = courses.filter((course) => course.id !== id)
  setStorageItem(STORAGE_KEYS.COURSES, updatedCourses)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Delete Course",
    timestamp: new Date().toISOString(),
    details: `Deleted course: ${courseToDelete.title}`,
  })

  return true
}

// Notice Management Functions
const getAllNotices = (): Notice[] => {
  return getStorageItem<Notice[]>(STORAGE_KEYS.NOTICES, [])
}

const getNoticeById = (id: string): Notice | undefined => {
  const notices = getAllNotices()
  return notices.find((notice) => notice.id === id)
}

const addNotice = (noticeData: Omit<Notice, "id" | "createdAt" | "updatedAt">): Notice => {
  const notices = getAllNotices()
  const currentUser = getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized: Only admins can add notices")
  }

  const newNotice: Notice = {
    ...noticeData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  notices.push(newNotice)
  setStorageItem(STORAGE_KEYS.NOTICES, notices)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Add Notice",
    timestamp: new Date().toISOString(),
    details: `Added notice: ${newNotice.title}`,
  })

  return newNotice
}

const updateNotice = (
  id: string,
  noticeData: Partial<Omit<Notice, "id" | "createdAt" | "updatedAt">>,
): Notice | null => {
  const notices = getAllNotices()
  const currentUser = getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized: Only admins can update notices")
  }

  const noticeIndex = notices.findIndex((notice) => notice.id === id)
  if (noticeIndex === -1) return null

  const updatedNotice: Notice = {
    ...notices[noticeIndex],
    ...noticeData,
    updatedAt: new Date().toISOString(),
  }

  notices[noticeIndex] = updatedNotice
  setStorageItem(STORAGE_KEYS.NOTICES, notices)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Update Notice",
    timestamp: new Date().toISOString(),
    details: `Updated notice: ${updatedNotice.title}`,
  })

  return updatedNotice
}

const deleteNotice = (id: string): boolean => {
  const notices = getAllNotices()
  const currentUser = getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized: Only admins can delete notices")
  }

  const noticeToDelete = notices.find((notice) => notice.id === id)
  if (!noticeToDelete) return false

  const updatedNotices = notices.filter((notice) => notice.id !== id)
  setStorageItem(STORAGE_KEYS.NOTICES, updatedNotices)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Delete Notice",
    timestamp: new Date().toISOString(),
    details: `Deleted notice: ${noticeToDelete.title}`,
  })

  return true
}

// Inquiry Management Functions
const getAllInquiries = (): Inquiry[] => {
  return getStorageItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, [])
}

const getInquiryById = (id: string): Inquiry | undefined => {
  const inquiries = getAllInquiries()
  return inquiries.find((inquiry) => inquiry.id === id)
}

const addInquiry = (inquiryData: Omit<Inquiry, "id">): Inquiry => {
  const inquiries = getAllInquiries()
  const currentUser = getCurrentUser()

  const newInquiry: Inquiry = {
    ...inquiryData,
    id: Date.now().toString(),
  }

  inquiries.push(newInquiry)
  setStorageItem(STORAGE_KEYS.INQUIRIES, inquiries)

  // Log the activity if user is logged in
  if (currentUser) {
    addActivityLog({
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      action: "Submit Inquiry",
      timestamp: new Date().toISOString(),
      details: `Submitted inquiry: ${newInquiry.message.substring(0, 30)}...`,
    })
  }

  return newInquiry
}

const updateInquiryStatus = (id: string, status: "Pending" | "Resolved"): Inquiry | null => {
  const inquiries = getAllInquiries()
  const currentUser = getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized: Only admins can update inquiry status")
  }

  const inquiryIndex = inquiries.findIndex((inquiry) => inquiry.id === id)
  if (inquiryIndex === -1) return null

  const updatedInquiry: Inquiry = {
    ...inquiries[inquiryIndex],
    status,
  }

  inquiries[inquiryIndex] = updatedInquiry
  setStorageItem(STORAGE_KEYS.INQUIRIES, inquiries)

  // Log the activity
  addActivityLog({
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    action: "Update Inquiry Status",
    timestamp: new Date().toISOString(),
    details: `Updated inquiry status to ${status}`,
  })

  return updatedInquiry
}

// Activity Log Functions
const getAllActivityLogs = (): ActivityLog[] => {
  return getStorageItem<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, [])
}

const getActivityLogsByUser = (userId: string): ActivityLog[] => {
  const logs = getAllActivityLogs()
  return logs.filter((log) => log.userId === userId)
}

const addActivityLog = (logData: ActivityLog): ActivityLog => {
  const logs = getAllActivityLogs()
  logs.push(logData)
  setStorageItem(STORAGE_KEYS.ACTIVITY_LOGS, logs)
  return logData
}

// Export all functions
const storageService = {
  initializeStorage,
  login,
  register,
  logout,
  getCurrentUser,
  getAllUsers,
  updateUserProfile,
  deleteUserAccount,
  getAllCourses,
  getCourseById,
  getEnrolledCoursesForUser,
  enrollUserInCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  getAllNotices,
  getNoticeById,
  addNotice,
  updateNotice,
  deleteNotice,
  getAllInquiries,
  getInquiryById,
  addInquiry,
  updateInquiryStatus,
  getAllActivityLogs,
  getActivityLogsByUser,
  addActivityLog,
}

export default storageService
