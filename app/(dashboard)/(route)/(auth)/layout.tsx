"use client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
}
