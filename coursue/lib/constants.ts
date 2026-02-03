import {
    LayoutGrid,
    MessageSquare,
    BookOpen,
    CheckSquare,
    Users,
    Settings,
    ShoppingBag
} from "lucide-react";

export const MENU_ITEMS = [
    { icon: LayoutGrid, label: "Overview", active: true },
    { icon: BookOpen, label: "Lesson", active: false },
    { icon: CheckSquare, label: "Task", active: false },
    { icon: Users, label: "Group", active: false },
    { icon: ShoppingBag, label: "Courses", active: false },
];

export const FRIENDS = [
    { name: "Samantha", status: "Friend", avatar: "https://i.pravatar.cc/150?u=samantha" },
    { name: "Karen", status: "Friend", avatar: "https://i.pravatar.cc/150?u=karen" },
    { name: "Peter", status: "Old Friend", avatar: "https://i.pravatar.cc/150?u=peter" },
];

export const PROGRESS_CARDS = [
    {
        title: "UI/UX Design",
        watched: 2,
        total: 8,
        color: "bg-purple-100 text-purple-600",
        iconColor: "text-purple-600"
    },
    {
        title: "Branding",
        watched: 2,
        total: 8,
        color: "bg-pink-100 text-pink-600",
        iconColor: "text-pink-600"
    },
    {
        title: "Front End",
        watched: 2,
        total: 8,
        color: "bg-blue-100 text-blue-600",
        iconColor: "text-blue-600"
    },
];

export const WATCH_LIST = [
    {
        category: "Front End",
        title: "Beginner's Guide to becoming a pro Frontend Dev",
        mentor: "Dianne Russell",
        avatar: "https://i.pravatar.cc/150?u=dianne",
        color: "bg-orange-100", // Using a soft background color for the card visual
        image: "https://picsum.photos/seed/frontend/400/250"
    },
    {
        category: "Design",
        title: "Optimizing User Experience in a big product",
        mentor: "Cody Fisher",
        avatar: "https://i.pravatar.cc/150?u=cody",
        color: "bg-blue-100",
        image: "https://picsum.photos/seed/ux/400/250"
    }
];

export const LESSONS = [
    {
        mentor: "Ronald Richards",
        avatar: "https://i.pravatar.cc/150?u=ronald",
        date: "Sep 24",
        tag: "UI/UX",
        title: "Wireframing for easy to understand",
    },
    {
        mentor: "Wade Warren",
        avatar: "https://i.pravatar.cc/150?u=wade",
        date: "Sep 21",
        tag: "Branding",
        title: "Sketching for beginner can be pro",
    }
];

export const STATS_DATA = [
    { day: "Mon", value: 30 },
    { day: "Tue", value: 50 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 80 }, // Highlighted day
    { day: "Fri", value: 60 },
    { day: "Sat", value: 40 },
    { day: "Sun", value: 70 },
];

export const MENTORS = [
    { name: "Theresa Webb", role: "UI Designer", avatar: "https://i.pravatar.cc/150?u=theresa" },
    { name: "Albert Flores", role: "WP Developer", avatar: "https://i.pravatar.cc/150?u=albert" },
    { name: "Savannah Nguyen", role: "Scrum Master", avatar: "https://i.pravatar.cc/150?u=savannah" },
];
