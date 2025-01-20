"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

 function EmailVerificationPrompt() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] sm:w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
            <CardDescription className="text-center">We've sent a verification link to your Gmail</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Mail className="w-16 h-16 text-primary" />
            </motion.div>
            <p className="text-center text-muted-foreground">
              Please check your inbox and click on the verification link to complete your registration.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" onClick={() => window.open('https://mail.google.com', '_blank')}>
              Open Gmail
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Didn't receive the email? Check your spam folder or <a href="#" className="text-primary hover:underline">resend verification email</a>.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default EmailVerificationPrompt