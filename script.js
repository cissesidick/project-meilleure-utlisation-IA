/**
 * Classe pour créer des cartes de prix réutilisables
 */
class PricingCard {
    constructor({ title, price, period = '/mois', features, buttonText = 'Démarrer l\'essai', isPopular = false }) {
        this.title = title;
        this.price = price;
        this.period = period;
        this.features = features;
        this.buttonText = buttonText;
        this.isPopular = isPopular;
    }

    /**
     * Génère le HTML de la carte
     */
    render() {
        const card = document.createElement('div');
        card.className = `pricing-card${this.isPopular ? ' popular' : ''}`;
        
        card.innerHTML = `
            <h2 class="pricing-card__title">${this.title}</h2>
            <div class="pricing-card__price">${this.price}</div>
            <div class="pricing-card__price-period">${this.period}</div>
            <ul class="pricing-card__features">
                ${this.features.map(feature => `
                    <li class="pricing-card__feature">${feature}</li>
                `).join('')}
            </ul>
            <button class="pricing-card__btn" data-plan="${this.title}">
                ${this.buttonText}
            </button>
        `;

        // Ajouter l'événement au bouton
        const button = card.querySelector('.pricing-card__btn');
        button.addEventListener('click', () => this.handleClick());

        return card;
    }

    /**
     * Gère le clic sur le bouton
     */
    handleClick() {
        // Animation du bouton
        const button = event.target;
        button.textContent = 'Chargement...';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            alert(`Vous avez choisi le forfait : ${this.title}\nPrix : ${this.price}${this.period}`);
            button.textContent = this.buttonText;
            button.style.background = '';
        }, 800);
    }
}

/**
 * Fonction pour créer et afficher plusieurs cartes
 */
function createPricingCards(cardsData, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container avec l'ID "${containerId}" introuvable`);
        return;
    }

    // Vider le conteneur
    container.innerHTML = '';

    // Créer et ajouter chaque carte
    cardsData.forEach(cardData => {
        const card = new PricingCard(cardData);
        container.appendChild(card.render());
    });
}

// ===== DONNÉES DES CARTES =====
const pricingPlans = [
    {
        title: 'Forfait de base',
        price: '9,99 $',
        period: '/mois',
        features: [
            '1 Go de stockage',
            'Assistance de base',
            'Toutes les fonctionnalités principales',
            'Accès mobile',
            '1 utilisateur'
        ],
        buttonText: 'Démarrer l\'essai',
        isPopular: false
    },
    {
        title: 'Forfait Pro',
        price: '29,99 $',
        period: '/mois',
        features: [
            '50 Go de stockage',
            'Assistance prioritaire 24/7',
            'Fonctionnalités avancées',
            'Accès mobile & desktop',
            '5 utilisateurs',
            'Analyses détaillées'
        ],
        buttonText: 'Choisir Pro',
        isPopular: true
    },
    {
        title: 'Forfait Entreprise',
        price: '99,99 $',
        period: '/mois',
        features: [
            'Stockage illimité',
            'Support dédié',
            'Toutes les fonctionnalités',
            'Accès multi-plateforme',
            'Utilisateurs illimités',
            'API personnalisée',
            'Formation incluse'
        ],
        buttonText: 'Contactez-nous',
        isPopular: false
    }
];

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Créer les cartes au chargement de la page
    createPricingCards(pricingPlans, 'pricing-cards');
});

// ===== EXPORTS POUR RÉUTILISATION =====
// Si vous utilisez des modules ES6, décommentez ci-dessous :
// export { PricingCard, createPricingCards };