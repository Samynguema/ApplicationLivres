import { useMemo, useState } from 'react';
import './App.css';

const BOOKS = [
  {
    id: 'bk-1',
    title: 'Les Misérables',
    author: 'Victor Hugo',
    category: 'Classique',
    price: 16.9,
    rating: 4.8,
    year: 1862,
    cover: '📘',
    description: 'Une fresque sociale et humaine incontournable de la littérature française.'
  },
  {
    id: 'bk-2',
    title: 'L’Étranger',
    author: 'Albert Camus',
    category: 'Classique',
    price: 10.5,
    rating: 4.5,
    year: 1942,
    cover: '📙',
    description: 'Un roman court et puissant autour de l’absurde et du jugement.'
  },
  {
    id: 'bk-3',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Développement',
    price: 22.0,
    rating: 4.7,
    year: 2018,
    cover: '📗',
    description: 'Des méthodes concrètes pour construire de bonnes habitudes durables.'
  },
  {
    id: 'bk-4',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Tech',
    price: 35.9,
    rating: 4.9,
    year: 2008,
    cover: '📕',
    description: 'Les bonnes pratiques essentielles pour écrire du code lisible et maintenable.'
  },
  {
    id: 'bk-5',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    category: 'Jeunesse',
    price: 8.5,
    rating: 4.9,
    year: 1943,
    cover: '📘',
    description: 'Un voyage poétique et philosophique pour petits et grands.'
  },
  {
    id: 'bk-6',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'Histoire',
    price: 19.9,
    rating: 4.6,
    year: 2011,
    cover: '📙',
    description: 'Une histoire captivante de l’humanité depuis ses origines.'
  },
  {
    id: 'bk-7',
    title: '1984',
    author: 'George Orwell',
    category: 'Roman',
    price: 11.9,
    rating: 4.8,
    year: 1949,
    cover: '📗',
    description: 'Une dystopie majeure sur la surveillance, le pouvoir et la liberté.'
  },
  {
    id: 'bk-8',
    title: 'La Peste',
    author: 'Albert Camus',
    category: 'Roman',
    price: 12.9,
    rating: 4.4,
    year: 1947,
    cover: '📕',
    description: 'Un récit profond sur la condition humaine face à l’épreuve collective.'
  },
  {
    id: 'bk-9',
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Développement',
    price: 18.0,
    rating: 4.3,
    year: 2016,
    cover: '📘',
    description: 'Comment cultiver la concentration et produire un travail de grande valeur.'
  },
  {
    id: 'bk-10',
    title: 'Harry Potter à l’école des sorciers',
    author: 'J.K. Rowling',
    category: 'Jeunesse',
    price: 14.5,
    rating: 4.9,
    year: 1997,
    cover: '📙',
    description: 'Le début d’une aventure magique mondialement connue.'
  },
  {
    id: 'bk-11',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Tech',
    price: 24.0,
    rating: 4.2,
    year: 2008,
    cover: '📗',
    description: 'Une sélection des concepts fondamentaux à maîtriser en JavaScript.'
  },
  {
    id: 'bk-12',
    title: 'Le Comte de Monte-Cristo',
    author: 'Alexandre Dumas',
    category: 'Classique',
    price: 17.5,
    rating: 4.8,
    year: 1846,
    cover: '📕',
    description: 'Un grand roman d’aventure, de justice et de vengeance.'
  }
];

const CATEGORIES = ['Tous', ...new Set(BOOKS.map((book) => book.category))];

const formatPrice = (value) => `${value.toFixed(2)} €`;

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState({});
  const [checkout, setCheckout] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    payment: 'Carte bancaire'
  });
  const [confirmation, setConfirmation] = useState('');

  const filteredBooks = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const matchingBooks = BOOKS.filter((book) => {
      const matchesCategory = category === 'Tous' || book.category === category;
      const matchesSearch =
        keyword.length === 0 ||
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword) ||
        book.description.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });

    return matchingBooks.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.year - a.year;
      return b.rating - a.rating;
    });
  }, [search, category, sortBy]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([bookId, quantity]) => {
          const book = BOOKS.find((item) => item.id === bookId);
          if (!book) {
            return null;
          }

          return {
            ...book,
            quantity,
            lineTotal: quantity * book.price
          };
        })
        .filter(Boolean),
    [cart]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItems]
  );

  const shipping = subtotal > 0 && subtotal < 60 ? 4.9 : 0;
  const total = subtotal + shipping;

  const addToCart = (bookId) => {
    setCart((current) => ({
      ...current,
      [bookId]: (current[bookId] || 0) + 1
    }));
    setConfirmation('');
  };

  const changeQuantity = (bookId, delta) => {
    setCart((current) => {
      const nextQuantity = (current[bookId] || 0) + delta;
      if (nextQuantity <= 0) {
        const updated = { ...current };
        delete updated[bookId];
        return updated;
      }

      return {
        ...current,
        [bookId]: nextQuantity
      };
    });
    setConfirmation('');
  };

  const removeFromCart = (bookId) => {
    setCart((current) => {
      const updated = { ...current };
      delete updated[bookId];
      return updated;
    });
    setConfirmation('');
  };

  const onCheckoutFieldChange = (event) => {
    const { name, value } = event.target;
    setCheckout((current) => ({
      ...current,
      [name]: value
    }));
  };

  const submitOrder = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      setConfirmation('Votre panier est vide. Ajoutez au moins un livre avant de commander.');
      return;
    }

    const hasEmptyField = Object.entries(checkout).some(([, value]) => value.trim() === '');
    if (hasEmptyField) {
      setConfirmation('Merci de remplir toutes les informations de livraison et de paiement.');
      return;
    }

    const orderNumber = `CMD-${Date.now().toString().slice(-6)}`;
    setConfirmation(`Commande validée 🎉 Référence: ${orderNumber}`);
    setCart({});
  };

  return (
    <div className="storefront">
      <header className="store-header">
        <div>
          <h1>Boutique de livres</h1>
          <p>Découvrez, ajoutez au panier et commandez vos titres préférés.</p>
        </div>
        <div className="cart-badge" aria-label="nombre de livres dans le panier">
          Panier: {cartCount}
        </div>
      </header>

      <section className="toolbar" aria-label="filtres du catalogue">
        <input
          type="search"
          placeholder="Rechercher par titre, auteur ou mot-clé"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {CATEGORIES.map((currentCategory) => (
            <option key={currentCategory} value={currentCategory}>
              {currentCategory}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="featured">Tri: pertinence</option>
          <option value="rating">Tri: note</option>
          <option value="price-asc">Tri: prix croissant</option>
          <option value="price-desc">Tri: prix décroissant</option>
          <option value="newest">Tri: plus récent</option>
        </select>
      </section>

      <main className="store-content">
        <section className="books-panel" aria-label="catalogue de livres">
          <div className="panel-head">
            <h2>Catalogue</h2>
            <span>{filteredBooks.length} livre(s)</span>
          </div>

          <div className="book-grid">
            {filteredBooks.map((book) => (
              <article key={book.id} className="book-card">
                <div className="book-cover" aria-hidden="true">
                  {book.cover}
                </div>
                <h3>{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-description">{book.description}</p>

                <div className="book-meta">
                  <span className="tag">{book.category}</span>
                  <span className="tag">⭐ {book.rating}</span>
                  <span className="tag">{book.year}</span>
                </div>

                <div className="book-footer">
                  <strong>{formatPrice(book.price)}</strong>
                  <button type="button" onClick={() => addToCart(book.id)}>
                    Ajouter
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <p className="empty-message">Aucun livre ne correspond à votre recherche.</p>
          )}
        </section>

        <aside className="cart-panel" aria-label="panier et commande">
          <div className="panel-head">
            <h2>Votre panier</h2>
            <span>{cartCount} article(s)</span>
          </div>

          {cartItems.length === 0 ? (
            <p className="empty-message">Votre panier est vide.</p>
          ) : (
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{formatPrice(item.price)} × {item.quantity}</p>
                  </div>
                  <div className="cart-actions">
                    <button type="button" onClick={() => changeQuantity(item.id, -1)}>
                      −
                    </button>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)}>
                      +
                    </button>
                    <button type="button" onClick={() => removeFromCart(item.id)}>
                      Retirer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="cart-totals">
            <p>
              <span>Sous-total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </p>
            <p>
              <span>Livraison</span>
              <strong>{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</strong>
            </p>
            <p className="grand-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </p>
          </div>

          <form className="checkout-form" onSubmit={submitOrder}>
            <h3>Finaliser la commande</h3>
            <input
              type="text"
              name="fullName"
              placeholder="Nom complet"
              value={checkout.fullName}
              onChange={onCheckoutFieldChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={checkout.email}
              onChange={onCheckoutFieldChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Adresse"
              value={checkout.address}
              onChange={onCheckoutFieldChange}
            />
            <div className="checkout-row">
              <input
                type="text"
                name="city"
                placeholder="Ville"
                value={checkout.city}
                onChange={onCheckoutFieldChange}
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Code postal"
                value={checkout.postalCode}
                onChange={onCheckoutFieldChange}
              />
            </div>
            <select name="payment" value={checkout.payment} onChange={onCheckoutFieldChange}>
              <option>Carte bancaire</option>
              <option>PayPal</option>
              <option>Paiement à la livraison</option>
            </select>
            <button type="submit">Commander</button>
          </form>

          {confirmation && <p className="confirmation-message">{confirmation}</p>}
        </aside>
      </main>
    </div>
  );
}

export default App;
