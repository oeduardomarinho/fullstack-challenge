'use strict';

/**
 * Function to update database
 *
 * @param {{context: QueryInterface}} context
 *
 */
async function up({ context: queryInterface }) {
  const created_at = new Date();
  const updated_at = new Date();

  await queryInterface.bulkInsert(
    'professional_types',
    [
      'Abanador na agricultura',
      'Abastecedor de linha de produção',
      'Abatedor',
      'Abatedor - na extração de madeira',
      'Acompanhante de idosos',
      'Adegueiro',
      'Administrador',
      'Administrador de contadorias e registros fiscais',
      'Administrador de refeitório',
      'Administrador no comércio de mercadorias',
      'Afinador de motores a diesel',
      'Agente administrativo',
      'Agente administrativo supervisor',
      'Agente de coleta de lixo',
      'Agente de inspeção (qualidade)',
      'Agente de portaria',
      'Agente de segurança ferroviária',
      'Agente de vendas de serviços',
      'Agregado - na agropecuária',
      'Ajudante',
      'Ajudante de boiadeiro',
      'Ajudante de carga e descarga de mercadoria',
      'Ajudante de churrasqueiro',
      'Ajudante de confecção',
      'Ajudante de derrubada',
      'Ajudante de eletricista',
      'Ajudante de embalador',
      'Ajudante de ensacador',
      'Ajudante de estruturas metálicas',
      'Ajudante de farmácia',
      'Ajudante de fábrica de tijolos',
      'Ajudante de lavador de automóvel',
      'Ajudante de obras',
      'Ajudante de pintor',
      'Ajudante de reparador (telecomunicações)',
      'Ajudante de serralheiro',
      'Ajustador de máquinas de embalagem',
      'Alfeloeiro',
      'Alinhador de rodas',
      'Almoxarife',
      'Alvanel',
      'Analista Big Data',
      'Analista de BI (Business Intelligence)',
      'Analista de Desenvolvimento Humano Organizacional',
      'Analista de Service Desk',
      'Analista de cobrança',
      'Analista de comunicação (teleprocessamento)',
      'Analista de controle de qualidade',
      'Analista de desenvolvimento de sistemas',
      'Analista de logística (técnico de nível médio)',
      'Analista de logística de transporte',
      'Analista de planejamento financeiro',
      'Analista de suporte computacional',
      'Anotador de consumo de energia elétrica',
      'Anotador de processo de produção',
      'Apanhador de café',
      'Apontador de cartões de ponto',
      'Arador',
      'Armador de estrutura de concreto',
      'Armador de estrutura de concreto armado',
      'Arraçoador (pecuária polivalente)',
      'Arrematador',
      'Arrumadeira de hotel',
      'Arrumador de prateleiras - em supermercados',
      'Asfaltador na conservação de vias permanentes (exceto trilhos)',
      'Assessor de diretoria',
      'Assistente de engenharia (construção civil)',
      'Assistente de prevenção de perdas',
      'Assistente de serviço de contabilidade',
      'Assistente de vendas',
      'Atendente balconista',
      'Atendente central telemarketing',
      'Atendente comercial (agência postal)',
      'Atendente de agência',
      'Atendente de bar',
      'Atendente de buffet',
      'Atendente de clínica dentária',
      'Atendente de clínica médica',
      'Atendente de clínica veterinária',
      'Atendente de creche',
      'Atendente de pedágio',
      'Atendente de posto de gasolina',
      'Auxiliar administrativo',
      'Auxiliar de armazenamento',
      'Auxiliar de conservação de barragens',
      'Auxiliar de coordenação de ensino fundamental de primeira a quarta séries',
      'Auxiliar de corte (preparação da confecção de roupas)',
      'Auxiliar de costura',
      'Auxiliar de eletrônica',
      'Auxiliar de encanador',
      'Auxiliar de enfermagem',
      'Auxiliar de faturamento',
      'Auxiliar de garçom',
      'Auxiliar de laboratório de análises clínicas',
      'Auxiliar de lavanderia',
      'Auxiliar de limpeza',
      'Auxiliar de manutenção elétrica e hidráulica',
      'Auxiliar de marceneiro',
      'Auxiliar de processamento de fumo',
      'Auxiliar de serviço de copa',
      'Auxiliar de torneiro mecânico',
      'Auxiliar de técnico de controle de qualidade',
      'Auxiliar mecânico de ar condicionado',
      'Avicultor - exclusive conta própria na avicultura de postura',
      'Avicultor de corte - exclusive conta própria e empregador',
      'Açougueiro',
      'Açougueiro classificador (exclusive comércio)',
      'Açougueiro cortador (exclusive comércio)',
      'Banguezeiro - empregador',
      'Borracheiro',
      'Broqueador de cilindros',
      'Calculista de produção',
      'Caldeireiro (chapas de ferro e aço)',
      'Carapina',
      'Carpinteiro (obras)',
      'Carregador (armazém)',
      'Carregador (veículos de transportes terrestres)',
      'Caçambeiro',
      'Cerâmico',
      'Chanfrador de calçados',
      'Chasquil',
      'Chofer',
      'Colhedor de banana',
      'Colhedor de cana-de-açúcar',
      'Colhedor de uva',
      'Colocador de estruturas metálicas',
      'Condutor de escavadeira',
      'Condutor de veículo de carga',
      'Conferente de carga e descarga',
      'Construtor civil',
      'Consultor de vendas',
      'Costureira de máquina overloque',
      'Cozinheiro de restaurante',
      'Demonstrador de mercadorias',
      'Desenhista de editorial',
      'Desenvolvedor Mobile',
      'Educador infantil de nível médio',
      'Eletricista',
      'Eletricista de alta-tensão',
      'Encarregado de garagem',
      'Encarregado de padaria',
      'Encarregado de supermercado',
      'Encarregado de telemarketing',
      'Enfermeiro',
      'Entijolador',
      'Farmacêutico',
      'Fisioterapeuta',
      'Gari',
      'Gerente administrativo',
      'Gerente de área de vendas',
      'Gesseiro',
      'Go - gentil organizador',
      'Guariteiro',
      'Guest relations',
      'Injetor de plástico',
      'Instalador de máquinas',
      'Instrutor de auto-escola',
      'Jardineiro (árvores para ornamentação urbana)',
      'Manipulador de máquinas fixas',
      'Montador de acessórios',
      'Montador de andaimes (edificações)',
      'Montador de artefatos de madeira',
      'Montador soldador',
      'Motofretista',
      'Motorista de caminhão-guincho leve',
      'Motorista de empilhadeira',
      'Motorista de ônibus rodoviário',
      'Motorista de ônibus urbano',
      'Médico clínico',
      'Nutricionista',
      'Operador de centro de processamento de dados',
      'Operador de estufas mecânicas',
      'Operador de manufaturado (química',
      'Operador de máquina de terraplenagem',
      'Operador de negócios',
      'Operador de suporte técnico (telemarketing)',
      'Operador de teleatendimento ativo (telemarketing)',
      'Operador de teleatendimento híbrido (telemarketing)',
      'Operador polivalente da indústria têxtil',
      'Pintor de estruturas metálicas',
      'Plantador de milho e sorgo - empregador',
      'Professor das séries iniciais',
      'Professor de creche',
      'Professor de ensino fundamental - séries iniciais',
      'Professor de ensino pré-escolar',
      'Promotor de vendas',
      'Promotor de vendas especializado',
      'Representante técnico de vendas',
      'Secretária (técnico em secretariado - português)',
      'Supervisor comercial',
      'Supervisor de segurança do trabalho',
      'Trabalhador de serviços de limpeza e conservação de áreas públicas',
      'Trabalhador polivalente da confecção de calçados',
      'Técnico de Infraestrutura TI',
      'Técnico de enfermagem',
      'Vendedor de consórcio',
      'Vendedor em comércio atacadista',
      'Vendedor pracista',
      'Vigia',
      'Zelador'
    ].map((description) => ({
      description,
      created_at,
      updated_at
    }))
  );
}

/**
 * Function to undo updates in database
 *
 * @param {{context: QueryInterface}} context
 *
 */
async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('professional_types', null, {});
}

module.exports = { up, down };
