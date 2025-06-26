import React, { useState, useEffect } from 'react';
import { BarChart, Users, Briefcase, DollarSign, FileText, ArrowLeft } from 'lucide-react';

// Supabase config
const supabaseUrl = 'https://nxtxlueqzujqnsuqxmry.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dHhsdWVxenVqcW5zdXF4bXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Nzg4NjcsImV4cCI6MjA2NjQ1NDg2N30.Mq3vDWbk9bFhrOaK5MTOHZNNoh0w-878dH5ybOAp7m4';

function Header({ onNavClick, activeView }) {
    const navItems = [
        { id: 'dashboard', label: 'Painel Principal', icon: BarChart },
        { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
        { id: 'funcionarios', label: 'Funcionários', icon: Users },
        { id: 'contatos', label: 'Contatos', icon: Briefcase },
        { id: 'notasFiscais', label: 'Notas Fiscais', icon: FileText },
    ];
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <BarChart className="h-8 w-8 text-indigo-600" />
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 -mb-1">Share Brasil</h1>
                            <p className="text-sm text-gray-500">Sistema de Gestão</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-2">
                        {navItems.map(item =>
                            <button
                                key={item.id}
                                onClick={() => onNavClick(item.id)}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeView === item.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <item.icon className="h-5 w-5 mr-2" />{item.label}
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

function ContactManagement({ supabase }) {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!supabase) return;
        const fetchContacts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('contacts')
                .select('*');
            if (!error) setContacts(data || []);
            setLoading(false);
        };
        fetchContacts();
    }, [supabase]);

    const filteredContacts = contacts.filter(c => {
        const s = search.toLowerCase();
        return (
            c.name?.toLowerCase().includes(s) ||
            c.cnpjCpf?.toLowerCase().includes(s) ||
            c.email?.toLowerCase().includes(s) ||
            c.phone?.toLowerCase().includes(s)
        );
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
                    <p className="text-gray-600">Busca e gestão de clientes reais do Supabase</p>
                </div>
                <input
                    type="text"
                    placeholder="Buscar por nome, CNPJ/CPF, e-mail ou telefone"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full sm:w-80 focus:ring-2 focus:ring-indigo-400"
                />
            </div>
            {loading ? (
                <div className="text-center text-gray-500 py-10">Carregando clientes...</div>
            ) : filteredContacts.length === 0 ? (
                <div className="text-center text-gray-500 py-10">Nenhum cliente encontrado.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContacts.map(contact => (
                        <div key={contact.id} className="bg-white p-6 rounded-lg shadow flex flex-col gap-2">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-lg">{contact.name}</span>
                                <span className={`ml-auto px-2 py-1 rounded-full text-xs font-semibold ${
                                    contact.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>{contact.status || 'Indefinido'}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">CNPJ/CPF: {contact.cnpjCpf}</div>
                            {contact.razao_social && (
                                <div className="flex items-center text-gray-600 text-sm">Razão social: {contact.razao_social}</div>
                            )}
                            {contact.email && (
                                <div className="flex items-center text-gray-600 text-sm">E-mail: {contact.email}</div>
                            )}
                            {contact.phone && (
                                <div className="flex items-center text-gray-600 text-sm">Telefone: {contact.phone}</div>
                            )}
                            {contact.address && (
                                <div className="flex items-center text-gray-600 text-sm">Endereço: {contact.address}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Dashboard() {
    return (
        <div className="text-center p-10">
            Painel principal em construção.<br />
            Escolha uma seção no menu acima.
        </div>
    );
}
function FinancialManagement() { return <div className="text-center p-10">Componente de Gestão Financeira...</div>; }
function EmployeeManagement() { return <div className="text-center p-10">Componente de Gestão de Funcionários...</div>; }
function InvoiceManagement() { return <div className="text-center p-10">Componente de Notas Fiscais...</div>; }

export default function App() {
    const [activeView, setActiveView] = useState('dashboard');
    const [supabase, setSupabase] = useState(null);

    useEffect(() => {
        const initSupabase = async () => {
            const { createClient } = await import('@supabase/supabase-js');
            setSupabase(createClient(supabaseUrl, supabaseKey));
        };
        initSupabase();
    }, []);

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <Dashboard />;
            case 'financeiro': return <FinancialManagement />;
            case 'funcionarios': return <EmployeeManagement />;
            case 'contatos': return <ContactManagement supabase={supabase} />;
            case 'notasFiscais': return <InvoiceManagement />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header onNavClick={setActiveView} activeView={activeView} />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 relative">
                {activeView !== 'dashboard' && (
                    <button
                        onClick={() => setActiveView('dashboard')}
                        className="flex items-center text-sm text-indigo-600 font-semibold hover:text-indigo-800 mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar ao Painel Principal
                    </button>
                )}
                <div>{renderView()}</div>
            </main>
        </div>
    );
}