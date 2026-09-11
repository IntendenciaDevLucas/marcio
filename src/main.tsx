import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import './styles.css'
import App from './App'
import { company } from './config/company'

const schema = { '@context': 'https://schema.org', '@type': 'Locksmith', name: company.name, telephone: company.phone, address: { '@type': 'PostalAddress', streetAddress: `${company.address.street}, ${company.address.neighborhood}`, addressLocality: company.city, addressRegion: company.state, postalCode: company.address.zipCode, addressCountry: 'BR' }, areaServed: company.serviceArea.filter(area=>area!=='Região') }
const script = document.createElement('script')
script.type = 'application/ld+json'
script.textContent = JSON.stringify(schema)
document.head.appendChild(script)
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>)
