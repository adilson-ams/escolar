

import React from 'react'

export default function RTBOdataTFoot(props) {

    return (
        <tfoot className="tfoot">
            <tr>
                {props.columns.map(function (d, index) {
                    return <th
                        key={"tfoot" + index}
                        style={{ textAlign: d.align }}
                        width={d.width}>
                        {d.Header}
                    </th>;
                })}
            </tr>
        </tfoot>
    );
}
