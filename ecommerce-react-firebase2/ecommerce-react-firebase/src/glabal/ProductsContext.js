import React, { createContext } from 'react';
import { db } from '../config/config'; // Assure-toi que tu as bien configuré Firebase
import { collection, onSnapshot } from 'firebase/firestore'; // Importer les fonctions Firestore nécessaires

// Crée un contexte sans valeur par défaut
export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
    state = {
        products: [] // Initialisation de l'état des produits
    };

    componentDidMount() {
        const productsRef = collection(db, 'produits'); // Utiliser la syntaxe modulaire pour obtenir la référence de la collection

        // Écouter les changements dans la collection "produits"
        onSnapshot(productsRef, (snapshot) => { 
            let updatedProducts = []; // Tableau temporaire pour stocker les produits
            snapshot.forEach(doc => {
                updatedProducts.push({
                    ProductID: doc.id,
                    ProductCategory: doc.data().category,
                    ProductDescription: doc.data().description,
                    ProductImg: doc.data().imageUrl,
                    ProductName: doc.data().name,
                    ProductPrice: doc.data().price,
                });
            });

            // Mettre à jour l'état avec tous les produits
            this.setState({ products: updatedProducts });
        });
    }

    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}
