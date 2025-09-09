"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  Star,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "next-themes";

export type MenuItem = { 
  label: string; 
  href: string; 
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
};

type ProfileMenuProps = {
  items?: MenuItem[];
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    initials?: string;
  };
};

const defaultItems: MenuItem[] = [
  { label: "Profile", href: "/profile", icon: <User className="h-4 w-4" /> },
  { label: "Account", href: "/account", icon: <Settings className="h-4 w-4" /> },
  { label: "Billing", href: "/billing", icon: <CreditCard className="h-4 w-4" /> },
  { label: "Notifications", href: "/notifications", icon: <Bell className="h-4 w-4" /> },
];

const defaultUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "",
  initials: "SC"
};

export default function ProfileMenu({ 
  items = defaultItems, 
  user = defaultUser 
}: ProfileMenuProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Switch to Dark";
      case "dark":
        return "Switch to System";
      default:
        return "Switch to Light";
    }
  };

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-foreground/10 text-foreground/80">
              {user.initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Star className="mr-2 h-4 w-4" />
          <span>Upgrade to Pro</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href}>
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        
        {/* Theme Toggle */}
        <DropdownMenuItem onClick={cycleTheme}>
          {getThemeIcon()}
          <span className="ml-2">{getThemeLabel()}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <Link href="/sign-out">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


