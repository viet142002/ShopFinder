import { useParams } from "react-router-dom";

function ReportDetail() {
    const { reportId } = useParams();

    return <>
        <h1>Report Detail</h1>
        <p>{reportId}</p>
    </>
}

export default ReportDetail;