import React from "react";
import MaterialTable, { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface IUser {
  nombre: string;
  email: string;
  rol: string;
  fechaRegistro: string;
}

const InformeUsuarios: React.FC<{ data: IUser[] }> = ({ data }) => {
  const columns: Array<Column<IUser>> = [
    { title: "Nombre", field: "nombre", filterPlaceholder: "Buscar nombre..." }, 
    { title: "Correo Electrónico", field: "email", filtering: false }, 
    { title: "Rol", field: "rol", filtering: false }, 
    { title: "Fecha de Registro", field: "fechaRegistro", type: "date", filtering: false },
  ];

  return (
    <div style={{ maxWidth: "100%", marginTop: "20px" }}>
      <MaterialTable
        title="Informe de Usuarios"
        columns={columns}
        data={data}
        options={{
          filtering: true, 
          columnsButton: true,
          draggable: true,
          paging: true,
          exportMenu: [
            {
              label: "Exportar a PDF",
              exportFunc: (cols, rows) => ExportPdf(cols, rows, "Informe_Usuarios"),
            },
            {
              label: "Exportar a CSV",
              exportFunc: (cols, rows) => ExportCsv(cols, rows, "Informe_Usuarios"),
            },
          ],
          headerStyle: {
            backgroundColor: "#1976d2",
            color: "#FFFFFF",
            fontWeight: "bold",
          },
          rowStyle: (_, index) => ({
            backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff",
          }),
          searchFieldStyle: {
            borderRadius: "25px",
            padding: "5px 15px",
            fontSize: "16px",
          },
          pageSize: 5,
          pageSizeOptions: [5, 10, 20],
        }}
        localization={{
          toolbar: {
            searchPlaceholder: "Buscar usuario...",
            exportTitle: "Exportar",
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            firstTooltip: "Primera página",
            previousTooltip: "Página anterior",
            nextTooltip: "Página siguiente",
            lastTooltip: "Última página",
          },
          header: {
            actions: "Acciones",
          },
        }}
      />
    </div>
  );
};

export default InformeUsuarios;