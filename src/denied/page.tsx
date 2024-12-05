import Link from "next/link"

export default function Denied() {
    return (
        <section className="flex flex-col gap-12 items-center">
            <h1 className="text-5xl">Access Denied</h1>
            <p className="text-3xl max-w-2xl text-center">You are logged in, but you do not have permission to access this page. Please contact an administrator if you believe this is an error.</p>
            
            {/* Image with CSS to make it smaller */}
            <div className="w-full flex justify-center">
                <img 
                    src="/images/access.jpeg"  // Path relative to the public folder
                    alt="Access Denied"
                    className="max-w-xs h-auto object-contain"  // Image size control
                />
            </div>

            <Link href="/" className="text-3xl underline">Return to Home Page</Link>
        </section>
    )
}
