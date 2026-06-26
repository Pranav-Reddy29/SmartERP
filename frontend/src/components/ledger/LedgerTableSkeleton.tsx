export default function LedgerTableSkeleton() {

    return (

        <div className="rounded-2xl border bg-white p-8">

            <div className="space-y-4">

                {Array.from({ length: 8 }).map((_, i) => (

                    <div
                        key={i}
                        className="h-12 animate-pulse rounded bg-slate-200"
                    />

                ))}

            </div>

        </div>

    );

}