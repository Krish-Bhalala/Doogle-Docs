interface DocumentsPageProps {
    children: React.ReactNode;
}

const DocumentPageLayout = ({children}: DocumentsPageProps) => {
    return ( 
        <div className="">
            <nav className="w-full bg-slate-300 text-center text-lg font-semibold">My Nav Bar</nav>
            {children}
        </div>
    );
}
 
export default DocumentPageLayout;