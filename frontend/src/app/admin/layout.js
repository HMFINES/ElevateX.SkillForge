export const metadata = {
  title: "Admin",
  description: "Protected admin workspace for managing ElevateX courses and learners.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return children;
}
