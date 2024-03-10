import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tooltip } from 'antd';
import axios from 'axios';
import PDFIcon from '../assets/icon/pdf_icon.png';
import Deletar from '../assets/icon/deletar.png';
import Checkout from '../assets/icon/checkout.png';
import Swal from 'sweetalert2'

// Componente da Tabela
const Curriculos = ({ user }) => {
  // Definindo o estado para os dados
  const [dados, setDados] = useState([]);

  // Função para buscar os currículos
  const buscarCurriculos = async () => {
    try {
      const response = await axios.post(`https://gabriellgomess.com/api_cria_curriculo/busca_curriculos.php`, { usuario: user.email });
      setDados(response.data);
      console.log("DADOS: ", response.data)
    } catch (error) {
      console.error('Erro ao buscar currículos:', error);
    }
  };

  // Adiciona uma experiência inicial ao montar o componente
  useEffect(() => {
    buscarCurriculos();
  }, []);

  // Definindo as colunas da tabela
  const colunas = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    // Adicione mais colunas conforme necessário
    {
      title: 'Ações',
      align: 'center',
      key: 'acao',
      render: (_, record) => (
        <Space size="middle" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {record.payment == 0 ?
            <a href={record.payment_url} target="_blank">
              <Tooltip title="Realize o pagamento para fazer o download">
                <img width='40px' src={Checkout} />
              </Tooltip>

            </a> :
            <a href={`https://gabriellgomess.com/api_cria_curriculo/gera_curriculo_pdf.php?id=${record.id}`} target='_blank'>
              <Tooltip title="Baixar currículo PDF">
                <img width='40px' src={PDFIcon} />
              </Tooltip>
            </a>
          }
          <Tooltip title="Excluir meu currículo">
            <img style={{ cursor: 'pointer' }} width='30px' src={Deletar} onClick={() => deletarUsuario(record.id)} />
          </Tooltip>

        </Space>
      ),
    },
  ];

  // Função para deletar usuário
  const deletarUsuario = (id) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`https://gabriellgomess.com/api_cria_curriculo/deleta_curriculo.php`, { id })
        .then(response => {
          console.log('Usuário deletado:', response.data);
          buscarCurriculos();
        })
      }
    })
    }
   
  

  return <Table columns={colunas} dataSource={dados} rowKey="id" />;
};

export default Curriculos;
