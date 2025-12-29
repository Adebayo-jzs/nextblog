"use client";

import { useState } from "react";
import { cn } from '@/lib/utils'
import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
export default function SponsorPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const payWithPaystack = () => {
    if (typeof window === "undefined") return;

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
      email,
      amount: Number(amount) * 100,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: name,
          },
        ],
      },
      callback: function (response) {
        alert("Payment successful: " + response.reference);
      },
      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <>
      {/* Load Paystack script ONLY in browser */}
      <script src="https://js.paystack.co/v1/inline.js"></script>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6 ">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Sponsor Theebayo's Blog</CardTitle>
                <CardDescription>Support the blog through cash gifts</CardDescription>
              </CardHeader>
              <CardContent> 
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="text"
                      placeholder="Bayo"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Amount</Label>
                    <Input
                      type="number"
                      placeholder="Amount (NGN)"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <Button className="w-full bg-[#4ee268]" onClick={payWithPaystack}>
                    {/* Pay */}
                    Pay {amount ? `₦${amount}` : ""}
                  </Button>
                </div> 
              </CardContent>
            </Card>
          </div>
           
        </div>
      </div>
    </>
  );
}