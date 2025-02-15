
const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <div>
            <h2>{title}</h2><h2>{subtitle}</h2>
        </div>
    )
}

export default PageHeader
