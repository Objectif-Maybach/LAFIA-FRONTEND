
import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
const TypeEtablissement = ({filteredTypesEtablissements, updateState, setIsDelete, setId, activeTab}) => {

    return (

        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Nom
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTypesEtablissements.map((type) => (
                            <tr key={type.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{type.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{type.establishment_types_name}</div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="text-gray-500">{type.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => updateState(activeTab, type)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <PencilIcon size={16} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900" onClick={() => { setIsDelete(true); setId(type.id) }}>
                                        <TrashIcon size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-4 py-3 border-t flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">1</span> à{" "}
                    <span className="font-medium">{filteredTypesEtablissements.length}</span> sur{" "}
                    <span className="font-medium">{filteredTypesEtablissements.length}</span> résultats
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50" disabled>
                        Précédent
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50" disabled>
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    )
}
export default TypeEtablissement;	