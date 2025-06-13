import {Editor} from "./editor";

// For toolbar
import  Toolbar from './toolbar' 


interface DocumentIdPageProps {
    params: Promise< {documentId: string} >;
}

const DocumentIdPage = async ({params}: DocumentIdPageProps) => {
    const { documentId } = await params;
    return (  
        <div className="bg-[#FAFBFD] px-2.5 py-=0.5 rounded-[24px] min-h-[40px] flex flex-col items-center gap-x-0.5 overflow-x-auto]">
            <Toolbar />
            <Editor />
        </div>
    );
}
 
export default DocumentIdPage;