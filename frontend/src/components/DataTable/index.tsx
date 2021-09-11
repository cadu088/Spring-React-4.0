import axios from "axios";
import { Salepage } from "types/sale";
import { BASE_URL } from "utils/requests";
import { format } from 'date-fns';
import { useEffect, useState } from "react";

const table = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState<Salepage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axios.get(BASE_URL + "/sales?page=0&size=20&sort=date,desc")
            .then(response => {
                setPage(response.data);
            });
    }, [])




    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Vendedor</th>
                        <th>Clientes visitados</th>
                        <th>Negócios fechados</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {page.content?.map(item => (
                        <tr key={item.id}>
                            <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                            <td>{item.seller.name}</td>
                            <td>{item.visited}</td>
                            <td>{item.deals}</td>
                            <td>{item.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default table;



export const formatLocalDate = (date: string, pattern: string) => {
    const dt = new Date(date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    return format(dtDateOnly, pattern);
}
