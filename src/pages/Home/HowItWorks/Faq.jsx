

const Faq = () => {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold">Frequently asked questions</h2>
                    <p className="text-sm  mt-2">Answers to common questions about sessions, pricing and getting started.</p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <details className="p-4 border rounded-lg" open>
                        <summary className="font-medium cursor-pointer">How do I book a session?</summary>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Browse available sessions on the Sessions page or click a tutor card and press Book. Follow the checkout flow to confirm.</p>
                    </details>

                    <details className="p-4 border rounded-lg">
                        <summary className="font-medium cursor-pointer">What payment methods do you accept?</summary>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">We accept major credit/debit cards and Stripe-supported payment methods. Invoices are available on request for corporate plans.</p>
                    </details>

                    <details className="p-4 border rounded-lg">
                        <summary className="font-medium cursor-pointer">Can I reschedule or cancel a booking?</summary>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Yes — you can reschedule or cancel from your dashboard up to 24 hours before the session start. For exceptions contact support.</p>
                    </details>

                    <details className="p-4 border rounded-lg">
                        <summary className="font-medium cursor-pointer">Do you offer free practice materials?</summary>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Yes — visit our Resources page for free worksheets, recommended apps and video lessons to practice between sessions.</p>
                    </details>
                </div>
            </div>
        </section>

        // <section id="faq" className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        //     <div className="max-w-6xl mx-auto">
        //         <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        //         <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Answers to common questions about sessions, pricing and getting started.</p>

        //         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        //             <details className="p-4 border rounded-lg" open>
        //                 <summary className="font-medium cursor-pointer">How do I book a session?</summary>
        //                 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Browse available sessions on the Sessions page or click a tutor card and press Book. Follow the checkout flow to confirm.</p>
        //             </details>

        //             <details className="p-4 border rounded-lg">
        //                 <summary className="font-medium cursor-pointer">What payment methods do you accept?</summary>
        //                 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">We accept major credit/debit cards and Stripe-supported payment methods. Invoices are available on request for corporate plans.</p>
        //             </details>

        //             <details className="p-4 border rounded-lg">
        //                 <summary className="font-medium cursor-pointer">Can I reschedule or cancel a booking?</summary>
        //                 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Yes — you can reschedule or cancel from your dashboard up to 24 hours before the session start. For exceptions contact support.</p>
        //             </details>

        //             <details className="p-4 border rounded-lg">
        //                 <summary className="font-medium cursor-pointer">Do you offer free practice materials?</summary>
        //                 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Yes — visit our Resources page for free worksheets, recommended apps and video lessons to practice between sessions.</p>
        //             </details>
        //         </div>

        //     </div>
        // </section>
    )
}

export default Faq