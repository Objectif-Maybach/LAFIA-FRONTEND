import { useEffect, useState } from "react";
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, CheckCircle, X, Lock, User2, DollarSign } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { GetAllStatutOrders } from "../../functions/StatutCommande/StatutCommandes";
import { getAllDriver } from "../../functions/driver/getAllDriver";
import Select from "react-select";
import { orderWaitById } from "../../functions/Commandes/Commandes";

const OrderWaitForm = ({ onClose, onSubmit, dataEdit, loading }) => {
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm(
        { mode: "onTouched" }
    );
    const [statut, setStatut] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [products, setProducts] = useState([]);
    const AllStatut = async () => {
        try {
            loading(true);
            const response = await GetAllStatutOrders();
            setStatut(response);
        } catch (error) {
            console.error(error);

        }
        finally {
            loading(false);
        }
    };
    const id = dataEdit?.id;

    const orderById = async (id) => {
        try{
            const response = await orderWaitById(id);
            // console.log('response', response);
            setProducts(response.order_product_temps);
            

        } catch (error) {
            console.error(error);
        }
        


    };
    const AllDriver = async () => {
        try {
            loading(true);
            const response = await getAllDriver();
            setDrivers(response);
        } catch (error) {
            console.error(error);
        }
        finally {
            loading(false);
        }
    };
    useEffect(() => {
        AllDriver();
        AllStatut();
    }, []);
    const UpdateOrder = user => {
        let data =
        {
            order_date: user.order_date,
            driver: user.driver,
            prix_livraison: user.prix_livraison,
            order_statut: user.order_statut,
            contact: {
                telephone: user.telephone,
                adresse: user.adresse
            },
            products: products.map((item) => ({
                'id' : item.product.id,
                "quantity" : item.quantity,
                'price' : item.product.price

            }))
        }


        onSubmit(data);
    };
    if (dataEdit.length != 0) {
        useEffect(() => {
            setValue('order_date', dataEdit?.order_date);
            setValue('prix_livraison', '');
            setValue('driver', 0);
            setValue('telephone', dataEdit?.client.contact);
            setValue('adresse', dataEdit?.client.contact);
            setValue('order_statut', 0);
            orderById(id)
        }, [dataEdit, setValue])
    }
    return (
        <div className="p-1">
            <form onSubmit={handleSubmit(UpdateOrder)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de la commande <span className="text-red-600">*</span> </label>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="datetime"
                                name="order_date"
                                {...register('order_date',
                                    { required: 'La date est obligatoire' })
                                }
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Statut  <span className="text-red-600">*</span> </label>
                        <Controller
                            name="order_statut"
                            control={control}
                            rules={{ required: "Le statut est obligatoire" }}
                            render={({ field }) => {
                                const selectedValue = statut.find(
                                    (cat) => cat.id === field.value
                                );

                                return (
                                    <Select
                                        {...field}
                                        value={selectedValue || null} // ceci permet de pré-sélectionner
                                        options={statut}
                                        getOptionLabel={(option) => option.statut_name}
                                        getOptionValue={(option) => option.id}
                                        onChange={(selectedOption) =>
                                            field.onChange(selectedOption ? selectedOption.id : null)
                                        }
                                        placeholder="-- En attente --"
                                        isClearable
                                    />
                                );
                            }}
                        />

                        {errors?.order_statut && <span className='text-sm text-red-600'>{errors.order_statut.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Livreur  <span className="text-red-600">*</span> </label>
                        <Controller
                            name="driver"
                            control={control}
                            rules={{ required: "Le livreur est obligatoire" }}
                            render={({ field }) => {
                                const selectedValue = drivers.find(
                                    (cat) => cat.id === field.value
                                );

                                return (
                                    <Select
                                        {...field}
                                        value={selectedValue || null} // ceci permet de pré-sélectionner
                                        options={drivers}
                                        getOptionLabel={(option) => option.driver_name}
                                        getOptionValue={(option) => option.id}
                                        onChange={(selectedOption) =>
                                            field.onChange(selectedOption ? selectedOption.id : null)
                                        }
                                        placeholder="-- Choisir --"
                                        isClearable
                                    />
                                );
                            }}
                        />
                        {errors?.driver && <span className='text-sm text-red-600'>{errors.driver.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone  <span className="text-red-600">*</span> </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <PhoneIcon size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                name="telephone"
                                {...register('telephone',
                                    { required: 'Le telephone est obligatoire' })
                                }
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="06 12 34 56 78"
                            />
                        </div>
                        {errors?.telephone && <span className='text-sm text-red-600'>{errors.telephone.message}</span>}

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPinIcon size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="adresse"

                                {...register('adresse')
                                }
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123 Rue de la Paix, BKO"
                            />
                        </div>
                        {errors?.adresse && <span className='text-sm text-red-600'>{errors.adresse.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix de la livraison</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="prix_livraison"

                                {...register('prix_livraison')
                                }
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123 Rue de la Paix, BKO"
                            />
                        </div>
                        {errors?.prix_livraison && <span className='text-sm text-red-600'>{errors.prix_livraison.message}</span>}
                    </div>

                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    >
                        <X size={18} className="mr-2" />
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Valider
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderWaitForm;
