import { useParams } from '@remix-run/react';



export default function DashId() {

    const {id} = useParams();
    return (
<div >
    <h1 >hello dash boy from the id page {id}</h1>
</div>
    );
}