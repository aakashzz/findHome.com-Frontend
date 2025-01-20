"use client"

import { motion } from 'framer-motion'

export default function BarLoader() {
   return <div className="flex justify-center items-center">
   <motion.div
     className="w-16 h-16 border-4 border-teal-200 rounded-full shadow-md"
     animate={{
       borderColor: ['#99f6e4', '#2dd4bf', '#99f6e4'],
       rotate: 360,
     }}
     transition={{
       duration: 1,
       repeat: Infinity,
       ease: "linear",
     }}
   >
     <motion.div
       className="w-full h-full border-4 border-teal-500 rounded-full"
       animate={{
         rotate: -360,
       }}
       transition={{
         duration: 1,
         repeat: Infinity,
         ease: "linear",
       }}
     />
   </motion.div>
 </div>
} 