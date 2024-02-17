import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

const SlideInNotifications = ({notifications, setNotifications}) => {

  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };
  

  return (
    <div className="flex items-center justify-center">
      <div className=" flex flex-col gap-1 w-60 fixed top-2 right-1 z-50 pointer-events-none">
      <AnimatePresence>
          {notifications.map((n) => (
            <Notification
              key={n.id}
              removeNotif={removeNotif}
              {...n}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const NOTIFICATION_TTL = 2000;

const Notification = ({ text, id, removeNotif }) => {
    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            removeNotif(id);
        }, NOTIFICATION_TTL);

        return () => clearTimeout(timeoutRef);
    }, []);

    return (
        <motion.div
            layout
            initial={{ y: -20, scale: 0.7, opacity: 0}}
            animate={{ y: 0, scale: 0.9, opacity: 1, transition: {
                ease: "easeInOut",
                type: "spring",
                damping: 15,
                stiffness: 120,
        }}}
            exit={{ y: 10, scale: 0.7, opacity: 0}}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative px-0 py-3 flex rounded gap-2 text-lg font-medium shadow-lg text-white bg-green-600 pointer-events-auto"
        >
            <button onClick={() => removeNotif(id)} className="absolute top-0 right-1 mt-1 ml-1">
                <FiX />
            </button>
            <FaRegCircleCheck className=" ml-2 mt-1" />
            <span>{text}</span>
        </motion.div>
    );
};

export default SlideInNotifications;
