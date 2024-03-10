import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, DatePicker, InputNumber, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import Swal from 'sweetalert2'

const { Text, Title } = Typography;

const Home = ({ user }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        // add user
        values.usuario = user.email;
        axios.post('https://gabriellgomess.com/api_cria_curriculo/salva_curriculo.php', values)
            .then((response) => {
                console.log('response:', response.data.success);
                if (response.data.success) {
                    Swal.fire({
                        title: 'Currículo salvo com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // window.location.href = '/curriculos';
                        }
                    });
                } else {
                    // sweet alert error
                    Swal.fire({
                        title: 'Erro ao salvar currículo!',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            })
            .catch((error) => {
                console.error('Erro ao salvar currículo:', error);
            });
    };
    

    // Adiciona uma experiência inicial ao montar o componente
    useEffect(() => {
        form.setFieldsValue({
            experiencias: [{}], // Inicializa com um objeto vazio para uma experiência
        });
    }, [form]);

    // Definir se a tela é lg, md, sm ou xs
    const [screenSize, setScreenSize] = useState(undefined);
    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Define o layout do form de acordo com o tamanho da tela    
    let layout = 'md';
    let responsive_direction = 'row';
    let responseive_gap = '20px';
    if (screenSize < 576) {
        layout = 'xs';
        responsive_direction = 'column';
        responseive_gap = '0px';
    } else if (screenSize < 768) {
        layout = 'sm';
        responsive_direction = 'column';
        responseive_gap = '0px';
    } else if (screenSize < 992) {
        layout = 'md';
    } else if (screenSize < 1200) {
        layout = 'lg';
    } else {
        layout = 'xl';
    }
    // Função para buscar o endereço pelo CEP
    const handleCepBlur = async (event) => {
        const cep = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                form.setFieldsValue({
                    logradouro: response.data.logradouro,
                    bairro: response.data.bairro,
                    cidade: response.data.localidade,
                    estado: response.data.uf,
                });
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };


    return (
        <Form form={form} name="resume_form" onFinish={onFinish} autoComplete="off" layout='vertical'>
            {/* Dados Pessoais */}
            {/* <p>Tela: {layout}</p> */}
            <Title level={3}>Dados Pessoais</Title>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: responseive_gap, flexDirection: responsive_direction }}>
                <Form.Item style={{ flexGrow: 1 }} name="area" label="Área de interesse" rules={[{ required: true }]}>
                    <Input placeholder="Área de interesse" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 4 }} name="nome" label="Nome" rules={[{ required: true }]}>
                    <Input placeholder="Seu nome completo" />
                </Form.Item>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: responseive_gap, flexDirection: responsive_direction }}>
                <Form.Item style={{ flexGrow: 1 }} name="cpf" label="CPF" rules={[{ required: true }]}>
                    <Input placeholder="Seu CPF" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 1 }} name="data_nascimento" label="Data de nascimento" rules={[{ required: true }]}>
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item style={{ flexGrow: 1 }} name="pis" label="PIS" rules={[{ required: true }]}>
                    <Input placeholder="Seu PIS" />
                </Form.Item>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: responseive_gap, flexDirection: responsive_direction }}>
                <Form.Item style={{ flexGrow: 1 }} name="email" label="E-mail" rules={[{ required: true, type: 'email' }]}>
                    <Input placeholder="Seu e-mail" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 1 }} name="telefone" label="Telefone" rules={[{ required: true, type: 'telefone' }]}>
                    <Input placeholder="Seu telefone" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 1 }} name="cep" label="CEP">
                    <Input placeholder="Digite seu CEP" onBlur={handleCepBlur} />
                </Form.Item>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: responseive_gap, flexDirection: responsive_direction }}>
                <Form.Item style={{ flexGrow: 5 }} name="logradouro" label="Logradouro" rules={[{ required: true }]}>
                    <Input placeholder="Logradouro" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 1 }} name="numero" label="Numero" rules={[{ required: true }]}>
                    <Input placeholder="Numero" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 1 }} name="complemento" label="Complemento">
                    <Input placeholder="Complemento" />
                </Form.Item>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: responseive_gap, flexDirection: responsive_direction }}>
                <Form.Item style={{ flexGrow: 3 }} name="bairro" label="Bairro" rules={[{ required: true }]}>
                    <Input placeholder="Bairro" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 3 }} name="cidade" label="Cidade" rules={[{ required: true }]}>
                    <Input placeholder="Cidade" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 1 }} name="estado" label="Estado" rules={[{ required: true }]}>
                    <Input placeholder="Estado" />
                </Form.Item>
            </div>

            <Title level={3}>Formação</Title>
            {/* Formação */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: responseive_gap, flexDirection: responsive_direction }}>
                <Form.Item style={{ flexGrow: 1 }} name="formacao" label="Formação" rules={[{ required: true }]}>
                    <Input placeholder="Formação" />
                </Form.Item>
                <Form.Item style={{ flexGrow: 1 }} name="formacao_academica" label="Formação acadêmica">
                    <Input placeholder="Formação acadêmica" />
                </Form.Item>
            </div>

            <Title level={3}>Experiências Profissionais</Title>
            {/* Experiências Profissionais */}
            <Form.List name="experiencias">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: responseive_gap, flexDirection: responsive_direction }}>
                                    <Form.Item
                                        style={{ flexGrow: 1 }}
                                        {...restField}
                                        name={[name, 'empresa']}
                                        label="Empresa"
                                        rules={[{ required: true, message: 'Empresa é obrigatória' }]}
                                    >
                                        <Input placeholder="Empresa" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ flexGrow: 1 }}
                                        {...restField}
                                        name={[name, 'de']}
                                        label="De"
                                        rules={[{ required: true, message: 'De' }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ flexGrow: 1 }}
                                        {...restField}
                                        name={[name, 'ate']}
                                        label="Até"
                                    >
                                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ flexGrow: 1 }}
                                        {...restField}
                                        name={[name, 'ultimo_salario']}
                                        label="Último salário"
                                    >
                                        <InputNumber placeholder="Último salário" style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ flexGrow: 1 }}
                                        {...restField}
                                        name={[name, 'cargo']}
                                        label="Cargo"
                                        rules={[{ required: true, message: 'Cargo é obrigatório' }]}
                                    >
                                        <Input placeholder="Cargo" />
                                    </Form.Item>
                                </div>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'atividades']}
                                    label="Atividades desempenhadas"
                                    rules={[{ required: true, message: 'Atividades desempenhadas' }]}
                                >
                                    <Input placeholder="Atividades desempenhadas" />
                                </Form.Item>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                                    <MinusCircleOutlined style={{ color: 'tomato' }} onClick={() => remove(name)} />
                                </div>

                            </div>



                        ))}
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Adicionar Experiência
                                </Button>
                            </Form.Item>
                        </div>
                    </>
                )}
            </Form.List>

            <Title level={3}>Cursos</Title>
            {/* Cursos */}
            <Form.List name="cursos">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (

                            <div key={key}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: responseive_gap, flexDirection: responsive_direction }}>
                                    <Form.Item
                                        style={{ flexGrow: 1 }}
                                        {...restField}
                                        name={[name, 'curso']}
                                        label="Curso"
                                    >
                                        <Input placeholder="Curso" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ flexGrow: 1 }}
                                        {...restField}
                                        name={[name, 'carga_horaria']}
                                        label="Carga horária"
                                    >
                                        <Input placeholder="Carga horária" style={{ width: '100%' }} />
                                    </Form.Item>

                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                                    <MinusCircleOutlined style={{ color: 'tomato' }} onClick={() => remove(name)} />
                                </div>
                            </div>


                        ))}
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Adicionar Curso
                                </Button>
                            </Form.Item>
                        </div>

                    </>
                )}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Enviar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Home;
