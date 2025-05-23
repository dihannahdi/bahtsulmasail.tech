import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AnimatedTabs = TabsPrimitive.Root;

const AnimatedTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-md bg-secondary/40 p-1 text-foreground relative overflow-hidden",
      className
    )}
    {...props}
  />
));
AnimatedTabsList.displayName = "AnimatedTabsList";

interface AnimatedTabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  index?: number;
  total?: number;
}

const AnimatedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  AnimatedTabsTriggerProps
>(({ className, index = 0, total = 1, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative z-10",
        "data-[state=active]:text-primary-foreground data-[state=active]:font-bold",
        className
      )}
      {...props}
    >
      {props.children}
      {props["data-state"] === "active" && (
        <motion.div
          layoutId="bubble"
          className="absolute inset-0 bg-gradient-to-r from-islamic-green to-islamic-blue rounded-sm"
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          style={{ 
            zIndex: -1,
          }}
        />
      )}
    </TabsPrimitive.Trigger>
  );
});
AnimatedTabsTrigger.displayName = "AnimatedTabsTrigger";

const AnimatedTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {props.children}
    </motion.div>
  </TabsPrimitive.Content>
));
AnimatedTabsContent.displayName = "AnimatedTabsContent";

export { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent }; 