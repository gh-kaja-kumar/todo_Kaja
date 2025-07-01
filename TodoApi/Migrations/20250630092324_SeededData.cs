using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    /// <inheritdoc />
    public partial class SeededData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "DueDate",
                value: new DateTime(2025, 7, 1, 14, 53, 23, 569, DateTimeKind.Local).AddTicks(8460));

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "DueDate",
                value: new DateTime(2025, 7, 1, 14, 53, 23, 571, DateTimeKind.Local).AddTicks(2270));

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "DueDate",
                value: new DateTime(2025, 7, 1, 14, 53, 23, 571, DateTimeKind.Local).AddTicks(2295));

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "DueDate",
                value: new DateTime(2025, 7, 1, 14, 53, 23, 571, DateTimeKind.Local).AddTicks(2297));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "DueDate",
                value: new DateTime(2025, 7, 1, 14, 46, 34, 579, DateTimeKind.Local).AddTicks(9193));

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "DueDate",
                value: new DateTime(2025, 7, 1, 14, 46, 34, 581, DateTimeKind.Local).AddTicks(1099));

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "DueDate",
                value: new DateTime(2025, 7, 1, 14, 46, 34, 581, DateTimeKind.Local).AddTicks(1117));

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "DueDate",
                value: new DateTime(2025, 7, 1, 14, 46, 34, 581, DateTimeKind.Local).AddTicks(1119));
        }
    }
}
