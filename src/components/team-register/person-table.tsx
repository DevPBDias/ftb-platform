"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Pencil } from "lucide-react";
import type { Person } from "@/hooks/use-team-form";

interface PersonTableProps {
  title: string;
  data: Person[];
  editingPersonId: string | null;
  editingPersonRole: Person["role"] | null;
  editName: string;
  setEditName: (value: string) => void;
  editDocument: string;
  setEditDocument: (value: string) => void;
  startEditing: (person: Person) => void;
  saveEditing: () => void;
  cancelEditing: () => void;
  handleDelete: (id: string, role: Person["role"]) => void;
}

export const PersonTable = React.memo(function PersonTable({
  title,
  data,
  editingPersonId,
  editName,
  setEditName,
  editDocument,
  setEditDocument,
  startEditing,
  saveEditing,
  cancelEditing,
  handleDelete,
}: PersonTableProps) {
  const getRoleDisplayName = (role: Person["role"]) => {
    switch (role) {
      case "player":
        return "Jogador";
      case "coach":
        return "Técnico";
      case "assistant":
        return "Assistente";
      default:
        return "";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <p className="font-medium text-gray-700 bg-gray-50 px-4 py-2 border-b border-gray-200">
        {title}:
      </p>
      {data.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Nenhum membro adicionado.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="py-2 text-gray-600 font-semibold">
                Tipo
              </TableHead>
              <TableHead className="py-2 text-gray-600 font-semibold">
                Nome
              </TableHead>
              <TableHead className="py-2 text-gray-600 font-semibold">
                CPF/RG
              </TableHead>
              <TableHead className="text-right py-2 text-gray-600 font-semibold">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const isEditing = editingPersonId === item.id;
              return (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {isEditing ? (
                    <>
                      <TableCell className="py-2">
                        {getRoleDisplayName(item.role)}
                      </TableCell>
                      <TableCell className="py-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-9 rounded-md"
                        />
                      </TableCell>
                      <TableCell className="py-2">
                        <Input
                          value={editDocument}
                          onChange={(e) => setEditDocument(e.target.value)}
                          className="h-9 rounded-md"
                        />
                      </TableCell>
                      <TableCell className="text-right flex gap-2 justify-end py-2">
                        <Button
                          size="sm"
                          onClick={saveEditing}
                          className="h-9 px-3 rounded-md"
                          variant="default"
                        >
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                          className="h-9 px-3 rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
                        >
                          Cancelar
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="py-2 text-gray-800">
                        {getRoleDisplayName(item.role)}
                      </TableCell>
                      <TableCell className="py-2 text-gray-800">
                        {item.name}
                      </TableCell>
                      <TableCell className="py-2 text-gray-600">
                        {item.document}
                      </TableCell>
                      <TableCell className="text-right flex gap-1 justify-end py-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEditing(item)}
                          className="h-9 w-9 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-md"
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(item.id, item.role)}
                          className="h-9 w-9 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
});
