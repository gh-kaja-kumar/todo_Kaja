using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "Description", "DueDate", "Priority" },
                values: new object[] { "Personal", "Wake up early in the morning", new DateTime(2025, 7, 1, 14, 46, 34, 579, DateTimeKind.Local).AddTicks(9193), 1 });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Description", "DueDate" },
                values: new object[] { "Personal", "Go to bed early", new DateTime(2025, 7, 1, 14, 46, 34, 581, DateTimeKind.Local).AddTicks(1099) });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Category", "Description", "DueDate", "Priority" },
                values: new object[] { "Personal", "Wake up early in the morning", new DateTime(2025, 7, 1, 14, 46, 34, 581, DateTimeKind.Local).AddTicks(1117), 1 });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Category", "Description", "DueDate" },
                values: new object[] { "Personal", "Go to bed early", new DateTime(2025, 7, 1, 14, 46, 34, 581, DateTimeKind.Local).AddTicks(1119) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "Description", "DueDate", "Priority" },
                values: new object[] { "General", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0 });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Description", "DueDate" },
                values: new object[] { "General", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Category", "Description", "DueDate", "Priority" },
                values: new object[] { "General", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0 });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Category", "Description", "DueDate" },
                values: new object[] { "General", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });
        }
    }
}
