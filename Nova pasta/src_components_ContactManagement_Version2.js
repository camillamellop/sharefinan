import React, { useState, useEffect } from 'react';

export default function ContactManagement({ supabase }) {
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
          <p className="text-gray-600">Busca e visualização dos clientes cadastrados</p>
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