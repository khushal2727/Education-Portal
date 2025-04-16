"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import JsBarcode from "jsbarcode"

interface ProfileBarcodeCardProps {
  rollNumber: string
}

export function ProfileBarcodeCard({ rollNumber }: ProfileBarcodeCardProps) {
  const barcodeRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (barcodeRef.current && rollNumber) {
      try {
        JsBarcode(barcodeRef.current, rollNumber, {
          format: "CODE128",
          lineColor: "#000",
          width: 2,
          height: 80,
          displayValue: true,
          fontSize: 16,
          margin: 10,
        })
      } catch (error) {
        console.error("Failed to generate barcode:", error)
      }
    }
  }, [rollNumber])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>ID Barcode</CardTitle>
        <CardDescription>Your unique identification barcode</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        {rollNumber ? (
          <svg ref={barcodeRef} className="w-full max-w-[200px]"></svg>
        ) : (
          <div className="text-center text-muted-foreground py-8">No roll number available to generate barcode</div>
        )}
      </CardContent>
    </Card>
  )
}
