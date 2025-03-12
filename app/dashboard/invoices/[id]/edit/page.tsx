import Form from "@/app/ui/invoices/edit-form"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Edit Invoice'
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

    const urlParams = await params
    const id = urlParams.id

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ])

    if (!invoice) notFound()

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {
                    label: 'Invoices',
                    href: '/dashboard/invoices'
                },
                {
                    label: 'Create Invoice',
                    href: `/dashboard/invoices/${id}/edit`,
                    active: true
                },
            ]} />
            <Form invoice={invoice} customers={customers} />
        </main>
    )
}
