import { format } from 'date-fns';

export default function generateHTML(array, htmlType, startDate, endDate, icon, plate) {
    return `
    
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap" rel="stylesheet">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Roboto', sans-serif;
        }

        body {
        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .header-info {
            display: flex;
            width: 30%;
            flex-direction: column;
            text-align: right;
        }

        .title {
            font-size: 25px;
            text-align: right;
            width: 35%;
        }

        .logo {
            width: 200px;
            height: auto;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid black;
        }

        thead tr th {
            font-size: 18px;
            border: 1px solid black;
            padding: 10px;
        }

        tbody tr th {
            font-size: 14px;
            border: 1px solid black;
            padding: 5px;
            text-align: right;
            font-weight: lighter;
        }

        tbody tr th:nth-child(4) {
            text-align: left;
        }

        tbody tr th:nth-child(3) {
            width: 150px;
        }

        td {
            border: 1px solid black;
        }

        td {
            padding: 5px;
        }
    </style>
</head>

<body>
    <div class="header">
        <image />
        <text class="title">${htmlType == 'stops' ? "Relatório de posições" : "Relatório de trajetos"}</text>
        <div class="header-info">
            <text>Período: ${format(startDate, 'dd/MM/yyyy')} 00:00 à ${format(endDate, 'dd/MM/yyyy')} 23:59</text>
            <text>Placa: ${plate}</text>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>Nº</th>
                <th>Data GPS</th>
                <th>Localização</th>
                <th>Velocidade</th>
                <th>Ignição</th>
                <th>Eletricidade</th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
        </thead>
        <tbody>
            ${
        array.reduce((soma, { gps_date, address, velocity, ignition, electricity, latitude, longitude }, index) => soma + (`
            <tr>
                <th>${index + 1}</th>
                <th>${gps_date}</th>
                <th>${address ?? 'Sem informação'}</th>
                <th>${velocity}</th>
                <th>${ignition}</th>
                <th>${electricity}</th>
                <th>${latitude}</th>
                <th>${longitude}</th>
            </tr>`), '')
        }
        </tbody>
    </table>
</body>

</html>
    `;
}