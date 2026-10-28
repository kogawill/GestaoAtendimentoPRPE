# Planejamento do sistema de gestão de atendimentos da PRPE

Universidade Federal de Catalão \| Pró-Reitoria de Políticas Estudantis

Planejamento funcional e técnico para desenvolvimento em Google Apps Script e Planilhas Google

Versão 1.0 \| 28 de outubro de 2026

# **1 Objetivo e decisões estruturantes**

Implantar uma plataforma para receber, distribuir, acompanhar e registrar as demandas dirigidas à PRPE, com protocolo, histórico de tramitação, notificações por e-mail e indicadores de gestão. A solução deverá reunir os nove instrumentos apresentados e uma entrada adicional denominada **Outros assuntos**.

**Somente integrantes autorizados da equipe da PRPE terão contas de usuário no sistema.** Estudantes e demais solicitantes preencherão os formulários públicos sem login Google, senha ou cadastro de acesso. A identificação informada no formulário será um dado da solicitação, e não uma identidade autenticada.

Recomenda-se uma solução com dois projetos Apps Script: **Portal Público e Núcleo de Atendimento**, executado pela conta institucional responsável, e **Painel da Equipe**, executado como o usuário que o acessa. O núcleo concentrará a autorização das operações, a numeração dos protocolos e as gravações. O painel identificará o servidor pelo Google e utilizará comunicação autenticada entre servidores para solicitar as operações ao núcleo.

O sistema deverá tratar separadamente atendimentos, denúncias e pesquisas de satisfação. As pesquisas produzirão registros e indicadores próprios; somente manifestações que exigirem providência individual serão convertidas em atendimento vinculado. Todas as submissões concluídas receberão número de registro no padrão de protocolo da aplicação.

| Decisão | Diretriz de implementação |
| :---- | :---- |
| Acesso público | Formulários próprios em HTML Service, sem autenticação do solicitante. |
| Acesso da equipe | Conta Google institucional, cadastro prévio ativo e autorização por função, setor e caso. |
| Dados | Planilhas Google privadas; arquivos anexos em pastas privadas do Google Drive. |
| Sigilo | Acesso específico a Serviço Social, Psicologia e denúncias; sem visibilidade geral por padrão. |
| Automação | Roteamento, protocolo, fila de notificações, alertas de prazo e rotinas de recuperação. |
| Decisões administrativas | Análise e decisão por pessoa competente; nenhuma sanção ou concessão automática. |
| Implantação | Prova de conceito, desenvolvimento por etapas, homologação e piloto antes da abertura geral. |

O planejamento define a versão inicial completa. Os nomes finais dos setores, as competências decisórias, os prazos de serviço, as regras de retenção e os parâmetros dos benefícios serão homologados pela PRPE. As propostas de prazo, capacidade e esforço apresentadas adiante são estimativas de projeto, não compromissos já aprovados.

# **Roteiro de leitura**

Selecione uma seção para navegar pelo documento. Os títulos também estão disponíveis no painel de navegação do editor.

[1 Objetivo e decisões estruturantes](#bookmark=id.lnwygzfgv83x)

[2 Catálogo de serviços e encaminhamento](#bookmark=id.5fk05tllispk)

[3 Ajustes necessários nos instrumentos atuais](#bookmark=id.mo1wvbqchzw4)

[4 Regras comuns dos formulários](#bookmark=id.r46nofkddady)

[5 Atendimento com Serviço Social](#bookmark=id.h4chxinhc3ds)

[6 Denúncia relativa à assistência estudantil](#bookmark=id.u5v0oe2njly3)

[7 Acolhimento psicológico](#bookmark=id.fuqq4fatw38)

[8 Outros assuntos](#bookmark=id.2ugjuktska27)

[9 Liberação de acesso ao Restaurante Universitário](#bookmark=id.qma1sdah2c62)

[10 Solicitação de parcerias no RU](#bookmark=id.cswke947chah)

[11 Pesquisas de satisfação com RU e cantina](#bookmark=id.1puf87st2mhk)

[12 Comunicação e denúncias na MUC](#bookmark=id.p7tqx1c4k4d2)

[13 Perfis de cadastro e gerenciamento](#bookmark=id.gxe08a5mpzea)

[14 Telas e jornadas de utilização](#bookmark=id.kn939sg8fjqy)

[15 Fluxos de atendimento e resultados](#bookmark=id.l968daggvygg)

[16 Protocolo e acompanhamento sem login](#bookmark=id.qqxs2hqz6mzk)

[17 Notificações eletrônicas](#bookmark=id.5511pvax0l25)

[18 Modelos de comunicação](#bookmark=id.i7lk0usvrtqm)

[19 Arquitetura da solução](#bookmark=id.txd9rhq1t3lg)

[20 Organização das bases e permissões](#bookmark=id.cvnuznsadnb3)

[21 Dicionário das estruturas complementares](#bookmark=id.80pkyfkw7j8x)

[22 Controle de gravações e recuperação](#bookmark=id.3z2a6aywlwt4)

[23 Organização do código e contratos de operação](#bookmark=id.g5fzhjok9dza)

[24 Proteção de arquivos e dados](#bookmark=id.6s3prrqxptn2)

[25 Indicadores e continuidade operacional](#bookmark=id.ja8yk73pxm5q)

[26 Etapas de desenvolvimento e estimativa de esforço](#bookmark=id.aw08wqjjvpz8)

[27 Testes e critérios de aceite](#bookmark=id.yz4bz5qwvtsn)

[28 Implantação e governança](#bookmark=id.xir3ttejo60b)

[29 Decisões para início do desenvolvimento](#bookmark=id.dpab3reukew6)

[30 Fontes documentais e referências técnicas](#bookmark=id.pvk0tdud1mjr)

# **2 Catálogo de serviços e encaminhamento**

O portal apresentará dez opções. Os códigos abaixo serão estáveis; a descrição exibida poderá ser atualizada sem alterar os registros históricos. A vinculação indica o encaminhamento funcional proposto a partir dos anexos, sujeito à confirmação da distribuição interna de competências.

| Código e serviço | Setor ou fila de destino | Tratamento |
| :---- | :---- | :---- |
| SS01 Atendimento com Serviço Social | Serviço Social | Análise e acompanhamento individual restrito. |
| SS02 Denúncia relativa à assistência estudantil | Serviço Social com acesso específico a denúncias | Identificada ou anônima; averiguação técnica. |
| PS01 Acolhimento psicológico | Setor de Psicologia | Solicitação de acolhimento, contato e agendamento restritos. |
| RU01 Liberação de acesso ao RU | Serviço Social na análise socioeconômica e equipe designada para operacionalização do RU | Etapas separadas de análise, decisão e efetivação do acesso. |
| RU02 Parcerias no RU | Setor de Nutrição e gestão do RU | Análise documental e de viabilidade; decisão conforme competência. |
| RU03 Satisfação com o RU | Setor de Nutrição | Pesquisa; atendimento vinculado quando necessário. |
| RU04 Satisfação com a cantina | Setor de Nutrição | Pesquisa; subsídio à fiscalização contratual por encaminhamento autorizado. |
| MU01 Fale com a MUC | Gestão da MUC e DAE | Dúvida, sugestão, elogio e reclamação. |
| MU02 Denúncia na MUC | Fila restrita da MUC e DAE para encaminhamento à Comissão Disciplinar | Proteção da identidade e controle de impedimentos. |
| GE01 Outros assuntos | Triagem central da PRPE | Classificação, encaminhamento, resposta ou indicação de canal competente. |

**Outros assuntos** será opção autônoma na página inicial. Não dependerá da seleção de outro formulário e não será confundida com o subtipo de mesmo nome já existente no requerimento do Serviço Social. A pessoa poderá indicar um setor ou selecionar “Não sei informar”; a distribuição efetiva caberá à triagem.

Setores e filas serão registros configuráveis. Recomenda-se cadastrar inicialmente Triagem central, Serviço Social, Psicologia, Nutrição e RU, Gestão da MUC e DAE. Outros setores da PRPE poderão ser incluídos para receber GE01, com definição de gestor, substituto e canal institucional.

A Comissão Disciplinar e a fiscalização de contratos poderão receber encaminhamentos institucionais. **Pessoas que não integrem a equipe da PRPE não receberão contas neste aplicativo.** Quando necessário, um servidor autorizado registrará o encaminhamento e a resposta recebida por canal institucional, com referência ao documento ou processo correspondente.

Os endereços servicosocial.prpe@ufcat.edu.br, nutricao.prpe@ufcat.edu.br e dae.prpe@ufcat.edu.br constam dos anexos. Servem como referências para homologação; nenhuma lista de destinatários será ativada sem conferir sua composição e adequação ao sigilo do serviço. Os demais endereços serão cadastrados pela administração do sistema.

# **3 Ajustes necessários nos instrumentos atuais**

Os formulários serão reconstruídos como interfaces do web app. O conteúdo será versionado e revisado pelos setores responsáveis antes da publicação. Não basta incorporar os Google Forms existentes, pois parte dos instrumentos associa o envio de arquivos à conta Google do respondente.

| Evidência nos anexos | Ajuste proposto |
| :---- | :---- |
| Formulários com coleta de conta Google no envio de anexos | Substituir por upload próprio do portal, com validação e armazenamento privado. |
| Denúncia da MUC informa preservação da identidade, mas apresenta coleta de e-mail Google | Distinguir denúncia identificada e sigilosa de denúncia anônima; não coletar identificadores na modalidade anônima. |
| Denúncia do Serviço Social menciona UFG e prazo de dez dias úteis | Atualizar referências institucionais e confirmar a vigência e o marco de contagem desse prazo. |
| Fale com a MUC anuncia dúvidas e sugestões, mas mostra apenas reclamação e elogio | Incluir as quatro modalidades; denúncias seguirão fluxo próprio. |
| Fale com a MUC contém instrução de anexo para denúncias | Substituir por “Anexos relacionados à manifestação” e oferecer orientação para o canal de denúncia. |
| Liberação do RU contém listas fechadas que aparecem apenas como “Escolher” no PDF | Obter do setor as opções de Cadastro Único e faixas de renda; não inventar valores. |
| Psicologia exige orientação sexual e identificação étnico-racial no pedido de agendamento | Propor retirada da obrigatoriedade e, quando dispensáveis nessa etapa, da própria coleta; submeter à equipe técnica. |
| Pesquisas coletam identificação e prometem divulgação coletiva | Explicitar a diferença entre coleta identificada e divulgação agregada; propor pesquisa sem identificação obrigatória. |
| Cantina apresenta ordem divergente entre as notas 2 e 3 em um item | Padronizar a escala, registrar a versão e impedir comparação histórica sem tratamento da diferença. |
| Denúncia MUC permite dez arquivos de até 10 GB cada | Adotar limites compatíveis com o web app; prever canal institucional específico para evidências maiores. |
| Há semestre, empresas, programas e portarias no texto dos instrumentos | Transformar em parâmetros com vigência; publicar somente dados confirmados pelos setores. |

As telas de pesquisa deverão incluir “Não se aplica”, “Não consumi” ou “Não sei avaliar”, conforme o item. A avaliação de condições não observáveis pelo usuário, como procedimentos de armazenamento, deverá ser revista pelo Setor de Nutrição. O formulário não substituirá inspeção técnica.

Não serão migrados como dados de solicitantes o nome e o e-mail da conta que aparece conectada nas impressões dos formulários. Esses elementos são da interface capturada. Os anexos fornecidos constituem modelos de coleta, não uma base de atendimentos históricos preenchidos.

# **4 Regras comuns dos formulários**

O modelo de cada formulário conterá identificador, versão, vigência, finalidade, setor responsável, campos, regras condicionais, limites de anexos, classificação de acesso, fluxo e política de prazos. Toda resposta conservará a versão utilizada no momento do envio.

| Grupo | Especificação proposta |
| :---- | :---- |
| Identificação | Nome, nome social quando informado, vínculo e matrícula quando pertinentes. CPF somente nos serviços com necessidade homologada. |
| Contato | E-mail principal digitado duas vezes; telefone com DDD ou DDI quando necessário; e-mail alternativo apenas quando justificado. |
| Vínculo acadêmico | Curso, nível de ensino e semestre de referência, conforme o serviço. Cadastro configurável; opção para curso não listado. |
| Conteúdo | Assunto e descrição, quando aplicáveis; até 200 e 10.000 caracteres, respectivamente, como limites iniciais configuráveis. |
| Ciência | Aviso de privacidade e declarações específicas, com versão e data. Ciência não será tratada automaticamente como consentimento jurídico. |
| Evidências | Anexos opcionais ou condicionais; registro de envio, tipo, tamanho e integridade. |
| Dados técnicos | Código de serviço, origem, chave de submissão, data do servidor e versão do formulário. |

Regras de validação deverão existir no navegador e no servidor. O servidor prevalecerá em caso de divergência, rejeitará campos desconhecidos e ignorará tentativas de definir perfil, responsável, situação, decisão ou grau de acesso pelo formulário público.

O e-mail digitado será inicialmente marcado como **não confirmado**. A confirmação de posse, quando necessária para comunicações ou complementações, será feita por link de finalidade limitada; não criará conta de estudante. A solicitação poderá ser recebida mesmo enquanto o contato estiver pendente de confirmação. Decisões sobre benefícios exigirão conferência pelos meios institucionais aplicáveis.

Denúncias anônimas não exigirão nome, matrícula, curso, telefone ou e-mail do denunciante. As pesquisas poderão ser respondidas sem identificação, conforme a versão homologada. Não haverá cadastro único de “usuário estudante”, senha, recuperação de senha, perfil discente ou login com Google no portal público.

A interface oferecerá rótulos claros, navegação por teclado, mensagens de erro junto ao campo, confirmação antes do envio, visualização em celular e recibo acessível para impressão. A cor não será o único indicador de situação. Dados sensíveis não serão mantidos em armazenamento persistente do navegador. Um rascunho temporário de envio, quando indispensável aos anexos, terá prazo de expiração e finalidade técnica delimitada.

# **5 Atendimento com Serviço Social**

**Fonte:** A01, páginas 2 a 6\. **Destino:** Serviço Social. **Acesso:** equipe técnica autorizada ao caso.

| Bloco | Campos do modelo e regra proposta |
| :---- | :---- |
| Pessoa e contato | Nome completo, e-mail, telefone, curso e matrícula. Manter como núcleo de identificação do requerimento. |
| Formação | Primeira graduação: sim ou não. Pós-graduação: sim ou não; se sim, modalidade e programa. |
| Histórico de benefícios | Já recebeu ou recebe benefício da PRPE; modalidades e ano de atendimento quando aplicável. |
| Modalidades do histórico | Apoio pedagógico; alimentação integral no RU; creche; AEIQ; emergencial; moradia e alimentação complementar; atendimento a desligados do PBP-MEC; PAIEQ; esporte e lazer; vaga na MUC; outro benefício. |
| Solicitação atual | AIEQ; auxílio emergencial; atendimento a desligados do PBP-MEC; acompanhamento socioacadêmico; outros assuntos do Serviço Social. Referências normativas parametrizadas. |
| Cadastro socioeconômico | Preenchimento do Cadastro Único do SIGAA no semestre vigente; semestre de referência; indicação de pendência quando não preenchido. |
| Relato | Breve descrição da solicitação, com orientação para não inserir documentação excessiva. |
| Declarações | Ciência sobre tratamento de dados, avaliação documental e de renda e rotina de contato. Texto versionado. |

O recebimento produzirá protocolo e encaminhamento direto à equipe autorizada. O profissional poderá solicitar complementação, registrar tentativa de contato, agendar entrevista, realizar encaminhamento e concluir o atendimento com resultado e fundamentação administrativa apropriada ao caso.

O instrumento prevê três tentativas de contato. O sistema deverá registrar data, canal, responsável e resultado de cada tentativa. Depois da terceira tentativa sem êxito, poderá sugerir encerramento por impossibilidade de contato; a ação dependerá de confirmação do profissional, observados o fluxo do setor e eventuais condições de acessibilidade. A nova solicitação deverá manter referência ao atendimento anterior, sem eliminá-lo.

Faltas, ausência de documentos ou inconsistências não produzirão indeferimento automático. A aplicação organizará a análise e seus registros; as regras de elegibilidade continuarão sujeitas às normas e à avaliação competente. Não se pressupõe integração automática com SIGAA, PBP-MEC ou sistemas de pagamento.

# **6 Denúncia relativa à assistência estudantil**

**Fonte:** A02, páginas 1 e 2\. **Destino:** Serviço Social em fila específica.

Coletar modalidade anônima ou identificada; dados do denunciante somente na modalidade identificada; nome e curso da pessoa denunciada, quando conhecidos; projetos ou benefícios relacionados; situação de requerente ou de lista de espera; justificativa obrigatória e evidências opcionais. Preservar as opções “Não sabe informar” e “Ainda não inserido, mas requerente ou aguardando vaga”.

O sistema permitirá mais de uma pessoa citada, em registros relacionados. A identidade do denunciante ficará separada do relato e dos dados da pessoa denunciada. A ausência de anexos não impedirá o recebimento. A análise da suficiência das informações será humana. O recebimento não implicará desligamento, suspensão de benefício ou presunção de veracidade.

O prazo de até dez dias úteis consta do modelo anexado. Sua aplicação dependerá de confirmação da vigência, competência e contagem pelo Serviço Social; o sistema deverá suportá-lo como regra específica, sem estendê-lo às demais denúncias.

# **7 Acolhimento psicológico**

**Fonte:** A03, páginas 1 e 2\. **Destino:** Setor de Psicologia.

O instrumento contém nome, e-mail, telefone, matrícula, curso, gênero, orientação sexual e identificação étnico-racial. Para a abertura do pedido, recomenda-se utilizar somente identificação, contato e vínculo acadêmico necessários ao acolhimento. A equipe técnica decidirá se os demais dados devem ser coletados posteriormente, de forma facultativa ou por instrumento específico, com finalidade definida.

Acrescentar, como proposta, disponibilidade de dias e turnos, preferência de contato e necessidade de recurso de acessibilidade. Não exigir relato clínico, diagnóstico, medicação ou histórico de saúde para concluir a solicitação de agendamento.

O fluxo compreenderá recebimento, contato, eventual lista de espera, agendamento, comparecimento ou ausência e encerramento administrativo da demanda. Registrar remarcações e cancelamentos sem apagar o histórico. Confirmar, sob controle de concorrência, que um mesmo profissional não tenha agendamentos sobrepostos.

A versão inicial manterá agenda própria na aplicação. Integração com Google Calendar poderá ser acrescentada posteriormente, mediante avaliação do sigilo de títulos, descrições, convidados e permissões. A aplicação proposta não será prontuário psicológico; registros clínicos e documentos profissionais deverão permanecer nos instrumentos apropriados ao serviço.

A página informará o horário de acompanhamento do canal e que o formulário não é monitorado continuamente. Textos institucionais de orientação para situações urgentes deverão ser definidos pela equipe responsável e mantidos como conteúdo configurável.

# **8 Outros assuntos**

**Origem:** requisito adicional do projeto. **Destino inicial:** Triagem central da PRPE.

| Campo | Regra proposta |
| :---- | :---- |
| Natureza | Solicitação, informação, dúvida, sugestão, elogio ou reclamação. Denúncias serão orientadas ao fluxo correspondente, sem impedir o recebimento de relato já iniciado. |
| Assunto e descrição | Obrigatórios; título breve e explicação da demanda. |
| Identificação e vínculo | Nome e categoria de vínculo; matrícula e curso apenas quando pertinentes ao atendimento solicitado. |
| Contato | E-mail para resposta; telefone facultativo. Sugestões e elogios poderão dispensar identificação, se a PRPE homologar essa possibilidade. |
| Setor sugerido | Lista dos setores habilitados e “Não sei informar”. |
| Anexos | Facultativos, conforme política comum. |

A triagem classificará e encaminhará a demanda, mantendo o mesmo protocolo. Havendo matéria sigilosa, deverá restringir o acesso antes de encaminhar. Se o assunto exceder a competência da PRPE, registrar orientação ou encaminhamento institucional pertinente, sem transferir automaticamente dados a terceiros.

O registro indevidamente classificado como assunto comum poderá ser convertido em denúncia restrita, preservando conteúdo, autoria das alterações e motivo da reclassificação. A pessoa solicitante não terá de preencher novamente o relato por mero erro de escolha de categoria.

# **9 Liberação de acesso ao Restaurante Universitário**

**Fonte:** A04, páginas 1 a 4\. **Destino:** análise pelo setor competente e operacionalização pela equipe designada ao RU.

| Bloco | Especificação |
| :---- | :---- |
| Identificação | Nome, matrícula, CPF e curso. A necessidade de CPF será confirmada para esse processo; mantê-lo fora de listagens gerais. |
| Contatos | E-mail institucional, e-mail pessoal e telefone. Definir um endereço principal para notificações e revisar a obrigatoriedade do segundo. |
| Situação acadêmica | Graduação presencial, pós-graduação presencial e primeira graduação; substituir perguntas potencialmente contraditórias por seleção coerente de nível e modalidade. |
| Solicitação | Primeira liberação ou alteração de faixa; registrar faixa anterior apenas quando pertinente. |
| Cadastro e renda | Cadastro Único do SIGAA, semestre de referência e faixa de renda declarada. Listas homologadas pelo Serviço Social, pois seus valores não aparecem no PDF. |
| Ciência | Conferência documental e de renda; cronograma de liberação; comunicação do resultado e do valor aplicável. |
| Uso interno | Data da conferência, responsável, faixa verificada, decisão, valor por refeição, vigência, data de efetivação e referência comprobatória. |

O fluxo deverá distinguir **solicitação recebida**, **análise socioeconômica**, **decisão registrada** e **acesso efetivado**. Uma decisão favorável não será apresentada como acesso já liberado antes da confirmação da etapa operacional.

Parâmetros de semestre, faixas, valores e datas de atendimento terão vigência. Não se fixará “2026-2” no código. A indicação de Cadastro Único não preenchido gerará orientação e pendência, com decisão final conforme o procedimento institucional homologado. O texto atual que prevê indeferimento será revisado pelo setor antes da implementação de bloqueios.

# **10 Solicitação de parcerias no RU**

**Fonte:** A05, páginas 1 a 4\. **Destino:** Nutrição e gestão do RU.

Coletar nome e vínculo do solicitante; tipo e número de identificador pertinente, evitando exigir simultaneamente matrícula, SIAPE e CPF; natureza da proposta entre pesquisa, extensão, cultura e ensino; título; unidade, curso ou instituição; autor principal e identificação; equipe; telefone e e-mail; orientador e e-mail do orientador; objetivo geral; datas previstas; detalhamento; duração e cronograma.

Prever campos de anexo separados para projeto, cronograma, declaração de ciência do orientador, termo de responsabilidade e parecer do Comitê de Ética em Pesquisa, quando aplicável. Projeto, cronograma e declaração do orientador aparecem como obrigatórios no anexo. A pertinência do orientador e dos documentos será confirmada para cada natureza de proposta.

Acrescentar a pergunta “A atividade envolve seres humanos?” para orientar a exigência do documento correspondente, sem substituir a análise sobre necessidade e regularidade da aprovação ética. Validar datas e conflitos de uso do espaço. O resultado registrará aprovação, aprovação com condições ou indeferimento, responsável competente, condições de execução e ciência do solicitante. A submissão não autorizará a atividade.

# **11 Pesquisas de satisfação com RU e cantina**

**Fontes:** A06, páginas 1 a 11, e A07, páginas 1 a 14\. **Destino:** Setor de Nutrição. As pesquisas serão instrumentos de avaliação, com registros separados da fila de atendimentos.

| Pesquisa | Conteúdo a preservar e estruturar |
| :---- | :---- |
| RU | Refeição e data; categoria de vínculo; curso quando pertinente; frequência de almoço e jantar; higiene do ambiente e dos utensílios; avaliação geral; salada; opção ovolactovegetariana ou vegana; tipo de arroz e avaliação de arroz branco e integral; feijão; guarnição; sobremesa; suficiência das porções; atendimento; pontos favoráveis e insatisfatórios; sugestão de preparação; comentário e imagem opcional. |
| Cantina | Refeição e data; categoria; curso quando pertinente; frequência; substituição de refeição por lanche; alimentos, critérios de escolha e bebidas; preço; troco e cupom fiscal; visibilidade de preços; instalações; portas e exaustão; atendimento e limpeza; resíduos; água; uniforme e EPI; origem e validade; armazenamento; exposição e temperatura; informação nutricional; itens de apoio; opções veganas; porções; atendimento; pontos positivos e negativos; sugestão, comentário e imagens. |

A pesquisa do RU também solicita nome, matrícula ou SIAPE, idade e sexo; a da cantina solicita matrícula ou SIAPE, idade e sexo. Recomenda-se dispensar identificação nominal e avaliar a necessidade das variáveis demográficas. A manutenção de qualquer campo dependerá de finalidade demonstrada e revisão do instrumento pela Nutrição. A comparação histórica deverá indicar a mudança de versão.

| Elemento | Regra de tratamento |
| :---- | :---- |
| Escala principal | 1 Péssima; 2 Muito ruim; 3 Ruim; 4 Nem boa nem ruim; 5 Boa; 6 Muito boa; 7 Ótima. Ajustar gênero gramatical ao item. |
| Respostas fora da escala | “Não consumi”, “Não se aplica” e “Não sei avaliar” serão códigos próprios, sem valor numérico e excluídos do denominador das médias. |
| Frequência | Preservar os valores do instrumento ou sua revisão homologada; não converter “Nenhuma” em dado ausente. |
| Ramificações | Mostrar avaliações de alimentos efetivamente consumidos; campos de sugestão somente quando houver sugestão. |
| Identificação | Preferência por coleta não nominal; contato opcional e separado se a pessoa desejar retorno. |
| Providência individual | Pergunta “Deseja solicitar retorno sobre esta manifestação?”; quando sim, coletar contato e criar atendimento vinculado à pesquisa. |
| Possível ocorrência grave | Revisão humana da Nutrição e eventual criação de atendimento restrito; não utilizar classificação automática como decisão final. |

O recibo identificará a submissão como **registro de pesquisa**, sem indicar prazo de resposta individual quando não houver atendimento. Os resultados enviados a empresas ou à fiscalização deverão ser agregados ou ter identificadores removidos após revisão. Não encaminhar automaticamente textos livres ou imagens que possam identificar participantes.

Na cantina, a versão atual admite até cinco imagens de 10 MB; no RU, uma de 10 MB. Os limites da nova aplicação serão os definidos na política de anexos, com informação clara sobre a alteração.

# **12 Comunicação e denúncias na MUC**

## 12 1 Fale com a MUC

**Fonte:** A08, páginas 1 e 2\. **Destino:** Gestão da MUC e DAE.

Manter nome e apartamento; ampliar a natureza para dúvida, sugestão, elogio e reclamação; coletar comentário; incluir e-mail digitado para retorno e telefone facultativo. O apartamento será exigido quando necessário à localização da demanda e dispensável para pessoa sem residência na MUC, conforme regra homologada. Anexos serão facultativos.

O gestor poderá classificar o assunto, solicitar esclarecimentos, atribuir providência, registrar encaminhamento e responder. Questões de manutenção poderão ter subcategoria própria. Demandas que envolvam identificação de terceiros ou possível infração deverão ser avaliadas quanto à migração para o canal restrito.

## 12 2 Canal de denúncia da MUC

**Fonte:** A09, páginas 1 a 4\. **Destino:** fila restrita da MUC e DAE, com encaminhamento à Comissão Disciplinar conforme competência.

| Campo | Especificação proposta |
| :---- | :---- |
| Modalidade | Identificada e sigilosa ou anônima; explicar claramente a diferença. |
| Denunciante | Nome e contato somente na modalidade identificada; identidade armazenada separadamente. |
| Pessoa ou local citado | Nome e/ou apartamento, conforme o instrumento; permitir “Não sei identificar” com descrição suficiente para análise. |
| Categoria | Agressão física ou verbal; assédio; barulho após horário permitido; bullying; danos materiais; discurso de ódio; fumo; furto; homofobia; injúria; racismo; roubo; outros. |
| Ocorrência | Data e horário, ou indicação aproximada; local; relato obrigatório; pessoas citadas e testemunhas, quando informadas. |
| Evidências | Documentos e imagens opcionais; recebimento possível mesmo sem anexo. |
| Declaração | Ciência de responsabilidade sobre as informações, com redação validada institucionalmente. |
| Uso interno | Admissibilidade, restrição de acesso, impedimentos, encaminhamento, referência de processo, providências e conclusão autorizada. |

O sistema distinguirá anonimato de confidencialidade. Na modalidade anônima, não coletará identificadores do denunciante nos campos do formulário. Na modalidade identificada, o acesso à identidade dependerá de permissão específica. Não se prometerá anonimato absoluto perante a infraestrutura utilizada; anexos e relatos podem conter informações identificadoras.

Um membro da equipe citado na denúncia não deverá receber notificação ou acesso automático. O fluxo permitirá registrar impedimento, transferir a responsabilidade a substituto autorizado e revisar acessos anteriores. Denúncias contra a própria gestão terão canal alternativo configurado e homologado pela instituição.

As decisões e os atos de apuração permanecerão submetidos ao procedimento competente. O aplicativo organizará o recebimento e o acompanhamento, sem substituir processo administrativo, contraditório ou canais oficiais de ouvidoria.

# **13 Perfis de cadastro e gerenciamento**

Autenticação confirma a conta Google utilizada; autorização determina as operações e os dados disponíveis. A autorização será aplicada no servidor a cada chamada, inclusive listagens, contagens, exportações e downloads. Ocultar botões não constitui controle de acesso.

| Perfil | Permissões principais | Limites |
| :---- | :---- | :---- |
| Administrador funcional | Cadastrar usuários, setores, serviços, modelos, fluxos e parâmetros; desativar acessos. | Sem acesso automático ao conteúdo de todos os casos sigilosos. |
| Gestor da PRPE | Indicadores consolidados e acompanhamento gerencial autorizado. | Sem prontuários, identidade de denunciantes ou relatos restritos por simples posição hierárquica. |
| Gestor de setor | Gerir fila do setor, distribuir casos, acompanhar prazos e habilitar substituições permitidas. | Não amplia o próprio escopo nem concede perfil de administrador. |
| Atendente ou técnico | Cadastrar atendimento recebido por outro canal, acompanhar casos permitidos, solicitar complementação e registrar respostas. | Atuação limitada aos serviços, casos e decisões autorizados. |
| Triagem | Receber GE01 e demandas gerais, classificar e encaminhar. | Sem leitura do conteúdo de serviços que entram diretamente em filas restritas. |
| Consulta ou auditoria | Consultar dados e trilhas no escopo expressamente autorizado. | Sem editar; acesso à identidade protegida exige concessão própria. |

Uma mesma pessoa poderá acumular funções em setores distintos. O controle será feito por vínculos de acesso, e não por um único campo de perfil global. As permissões especiais incluirão decidir, exportar, consultar identidade protegida, acessar caso restrito e administrar parâmetros. Não haverá perfil de estudante ou cadastro público de integrante da equipe.

O cadastro de usuário conterá identificador interno, nome, e-mail institucional canônico, situação, setores, funções, escopos, início e fim da autorização, responsável pela concessão e último acesso. Não se armazenarão senhas Google, tokens de acesso Google ou credenciais de estudantes.

O primeiro administrador será criado por procedimento controlado de implantação. O cadastro posterior exigirá aprovação de autoridade definida pela PRPE. A conta Google, o domínio institucional e a presença na lista de autorizados serão verificados; possuir e-mail institucional, isoladamente, não concederá acesso. Usuário não cadastrado, inativo ou com autorização vencida receberá negativa genérica.

Desligamento ou mudança de lotação exigirá desativação imediata dos vínculos, reatribuição de casos e revogação de permissões diretas eventualmente concedidas a arquivos. A validação será refeita em cada operação, sem depender de sessão antiga do navegador. Concessões críticas e acesso excepcional a conteúdo restrito exigirão justificativa e registro de aprovação por outra pessoa designada.

**Administração técnica da plataforma:** proprietários dos arquivos e editores do código possuem capacidade técnica de acessar dados. A separação de perfis da aplicação não elimina esse poder. Essas contas deverão ser reduzidas, formalmente autorizadas, protegidas por verificação em duas etapas e submetidas à governança institucional.

# **14 Telas e jornadas de utilização**

## 14 1 Portal público

| Tela | Conteúdo e comportamento |
| :---- | :---- |
| Página inicial | Dez serviços, explicação breve, opção Outros assuntos, consulta de protocolo, privacidade e canais institucionais. |
| Formulário | Campos condicionais por serviço, orientação sobre dados e anexos, revisão e envio. |
| Comprovante | Protocolo, data, tipo de registro, situação inicial, próximos passos e código reservado de acompanhamento. |
| Acompanhamento | Protocolo e código reservado; somente andamento e mensagens expressamente liberadas. |
| Complementação | Solicitação específica de informação, prazo e upload limitado; link temporário de finalidade restrita. |

A jornada será: escolher serviço, preencher, revisar, enviar, receber comprovante e acompanhar se necessário. Nenhuma dessas etapas exigirá criar conta ou utilizar login Google. O código reservado servirá para autorizar a consulta de um registro específico; não constituirá perfil discente ou sessão de usuário no sistema.

## 14 2 Painel interno

| Tela | Conteúdo e comportamento |
| :---- | :---- |
| Entrada da equipe | Autenticação Google e mensagem de autorização ou acesso negado. |
| Visão inicial | Pendências pessoais, fila do setor e indicadores permitidos. |
| Lista de atendimentos | Filtros por protocolo, período, serviço, situação, responsável e prazo; paginação. |
| Detalhe do atendimento | Dados permitidos, relato, anexos, histórico, mensagens, tarefas, agenda e decisão. |
| Cadastro interno | Registro de demanda recebida presencialmente, por telefone ou por e-mail; identificação do servidor que registrou. |
| Agenda | Disponibilidade, agendamentos, remarcações e faltas, segundo o setor. |
| Pesquisas | Instrumentos, respostas autorizadas, indicadores e atendimentos vinculados. |
| Administração | Usuários, vínculos, setores, catálogo, campos versionados, prazos, feriados e textos. |
| Operação | Falhas de envio, integrações, rotinas, recuperação e conferência de backups. |

As mensagens serão classificadas como **interna**, **visível ao solicitante** ou **restrita à equipe técnica do caso**. A interface exigirá confirmação da audiência antes da publicação de resposta ou exportação. O histórico pessoal do solicitante, quando pertinente, será limitado ao setor e à finalidade autorizados; não haverá visão irrestrita de todas as suas demandas.

Solicitações registradas pela equipe terão origem identificada, data do recebimento original e data do lançamento. A equipe não poderá registrar como manifestação direta do estudante um texto que ela própria produziu sem indicar essa circunstância.

# **15 Fluxos de atendimento e resultados**

O atendimento terá situação operacional, resultado e classificação de acesso em campos separados. Encaminhamento, mudança de responsável e alteração de prazo serão eventos de histórico, preservando o andamento principal.

| Situação | Entrada e saída permitidas |
| :---- | :---- |
| Recebido | Criado após gravação confirmada; segue à triagem ou diretamente à fila técnica. |
| Em triagem | Classificação e atribuição; segue para atendimento, pendência ou encaminhamento registrado. |
| Em atendimento | Análise, contato e providências; pode gerar pendência, agendamento ou conclusão. |
| Aguardando solicitante | Complementação definida e prazo registrado; retorno à análise após resposta válida. |
| Aguardando providência interna | Dependência de setor ou unidade; responsável pelo acompanhamento permanece definido. |
| Agendado | Data, profissional e local ou modalidade confirmados; comparecimento retorna ao atendimento. |
| Concluído | Resultado e resposta apropriada registrados por agente competente. |
| Cancelado ou arquivado | Motivo obrigatório; sem exclusão do registro ou do histórico. |

Resultados possíveis: orientação prestada, providência executada, deferido, deferido com condições, indeferido, encaminhado a canal competente, ausência de retorno, desistência ou duplicidade. O catálogo de resultados será limitado por serviço. “Denúncia procedente” não será opção geral da triagem; resultados de apuração dependerão do procedimento e da competência aplicáveis.

Para liberação do RU, a etapa de acesso efetivado será obrigatória antes de informar a disponibilidade operacional. Para parcerias, registrar condições e período autorizado. Para Psicologia, conclusão do pedido de agendamento não significará alta clínica. Para denúncias, a informação pública de andamento será reduzida e não exporá a apuração.

Reabertura exigirá motivo, responsável e novo prazo, quando cabível. O protocolo será mantido. Um novo objeto poderá originar protocolo relacionado. Duplicidades serão vinculadas, sem eliminar o conteúdo recebido. Edições concorrentes utilizarão número de versão para impedir sobrescrita silenciosa.

## 15 1 Prazos propostos para configuração inicial

Sugere-se pactuar triagem de demandas gerais em até dois dias úteis e primeiro contato técnico em até cinco dias úteis. São metas operacionais para discussão, não prazos legais. Serviços com cronograma próprio ou apuração específica terão regras próprias. A denúncia do Serviço Social manterá o prazo do modelo somente depois de confirmada sua vigência.

Cada regra definirá evento inicial, calendário, feriados, expediente, hipóteses de pausa, retomada, vencimento e escalonamento. Pausar uma meta interna não suspenderá automaticamente prazo legal ou regulamentar. Alertas poderão ocorrer a 80% do prazo e no vencimento, sem alterar decisões. O sistema manterá tanto tempo total decorrido quanto tempo útil de trabalho, descontando apenas pausas homologadas.

# **16 Protocolo e acompanhamento sem login**

Adotar protocolo legível no formato **PRPE-2026-000001**, com sequência anual única e crescente para todos os registros. O número não conterá setor, CPF, tipo de denúncia ou outra informação sensível. Cada registro também terá UUID interno, independente do número público.

A data será gerada no servidor. Para apresentação e virada anual, utilizar America/Sao\_Paulo. Internamente, armazenar instantes em UTC no formato ISO 8601\. Fuso do projeto, planilhas e cálculos de prazo serão compatibilizados.

O protocolo identificará a solicitação dentro da aplicação. **Não equivalerá a NUP ou número de processo SEI.** Quando houver formalização em outro sistema, armazenar a referência como vínculo externo, com validação pelo responsável.

## 16 1 Geração segura e repetição do envio

1\. O navegador gera uma chave de submissão e a conserva durante tentativas de envio da mesma solicitação.

2\. O núcleo valida formulário, anexos, limites e proteção contra abuso.

3\. Sob bloqueio do próprio núcleo, verifica se a chave já foi processada; em caso positivo, devolve o resultado autorizado correspondente.

4\. Reserva sequência, registra UUID, protocolo, dados, evento inicial e notificações pendentes, com identificadores determinísticos para recuperação.

5\. Confirma a persistência e retorna o comprovante; o envio de e-mail ocorre posteriormente, fora do bloqueio.

O mesmo pedido não deverá gerar novo atendimento porque houve duplo clique ou falha de rede. A chave terá verificação de consistência com o conteúdo e proteção para que sua simples adivinhação não permita recuperar dados. Lacunas na sequência serão admitidas quando decorrentes de falha documentada; números não serão reutilizados.

## 16 2 Código reservado e limites de consulta

O protocolo sozinho não autorizará acesso. Um código reservado, imprevisível, vinculado ao registro e ao propósito será fornecido no comprovante. Armazenar somente seu resumo criptográfico e metadados; manter segredos apenas no servidor. Uma implementação possível é derivar o token com HMAC-SHA256 a partir de chave secreta de 256 bits gerada por mecanismo criptográfico apropriado, identificador, nonce, finalidade e versão, evitando Math.random e números curtos como credencial. O nonce persistido permitirá reconstruir o link no servidor para o envio autorizado, sem gravar o token em texto aberto na fila.

A consulta por protocolo e código exibirá recebimento, andamento geral, pendências e mensagens liberadas. Não exibirá CPF, renda, identidade de denunciantes, informações de terceiros, notas internas, documentos de apuração ou conteúdo clínico. O código poderá ser revogado e substituído. Não deverá circular em registros técnicos, ferramentas de análise ou URLs com carregamento de recursos de terceiros.

Links para complementar dados terão escopo limitado, validade sugerida de sete dias e uso único ou revogação após a tarefa. Para comunicações sensíveis, a equipe confirmará o destinatário por meio institucional apropriado. Na denúncia anônima, não haverá recuperação do código por e-mail ou CPF; a pessoa será orientada a guardar o comprovante. Respostas externas não revelarão se um protocolo existe quando as credenciais forem inválidas.

# **17 Notificações eletrônicas**

Utilizar MailApp e uma fila persistente de mensagens. A conta institucional responsável pelo núcleo será a remetente técnica; nome de exibição e Reply-To serão configurados por serviço. Não pressupor a possibilidade de escolher arbitrariamente qualquer endereço no campo From. A leitura automática de respostas na caixa postal ficará fora da versão inicial. \[R05\]

| Evento | Destinatário | Conteúdo permitido |
| :---- | :---- | :---- |
| Solicitação recebida | Solicitante, quando houver e-mail | Protocolo, data e orientação de acompanhamento; sem reproduzir relato ou anexos sensíveis. |
| Novo atendimento | Responsável ou destinatários autorizados do setor | Aviso mínimo e link do painel; conferir permissão antes do envio. |
| Atribuição ou transferência | Novo responsável e gestor pertinente | Protocolo e ação requerida, segundo o grau de acesso. |
| Complementação | Contato apropriado do solicitante | Pendência objetiva, prazo e link específico; sem dados de terceiros. |
| Agendamento ou alteração | Solicitante e profissional autorizado | Data, horário e instruções necessárias; assunto discreto. |
| Conclusão | Solicitante, quando cabível | Orientação de resultado ou aviso de disponibilidade, conforme nível de proteção. |
| Prazo próximo ou vencido | Responsável e gestor permitido | Protocolo e prazo; escalonamento configurado. |
| Falha técnica ou de e-mail | Administrador técnico | Código do evento e diagnóstico sem conteúdo pessoal. |
| Pesquisa recebida | Opcional, se houver contato | Confirmação simples; nenhum envio individual à equipe para cada resposta comum. |

Denúncias anônimas sem contato não gerarão e-mail ao denunciante. Notificações sobre casos restritos não serão enviadas a listas gerais da PRPE. Mudanças de lotação e impedimentos deverão retirar o usuário dos destinatários futuros.

## 17 1 Processamento e confiabilidade

A fila conterá identificador do evento, destinatário, modelo, dados mínimos, situação, tentativas, próxima execução e erro resumido. Sugere-se acionamento periódico a cada cinco minutos, com lotes pequenos e verificação de MailApp.getRemainingDailyQuota(). As execuções programadas não garantem pontualidade ao segundo. \[R04, R05, R08\]

Estados: pendente, reservado para envio, enviado ao serviço, falha temporária, falha definitiva e resultado incerto. O trabalhador reservará o item por tempo limitado antes de enviá-lo. Adotar tentativas espaçadas, por exemplo após 5, 15 e 60 minutos, depois 6 horas, com limite e alerta para intervenção. Esgotamento de quota deverá adiar a mensagem, preservando o atendimento.

MailApp não fornece garantia de leitura ou de entrega na caixa de entrada. Se ocorrer falha após envio e antes da confirmação na planilha, poderá haver duplicidade em eventual nova tentativa. Registrar resultado incerto e aplicar política de reconciliação; não prometer envio exatamente uma vez. O comprovante em tela será a confirmação primária de recebimento.

# **18 Modelos de comunicação**

Os modelos serão versionados e revisados pelos setores. A aplicação preencherá variáveis com escape de conteúdo, validará o destinatário e permitirá prévia visualização quando houver resposta manual. Notas internas não integrarão automaticamente a mensagem.

## 18 1 Confirmação de recebimento

**Assunto:** PRPE \| Solicitação recebida \| {protocolo}

Prezado(a) solicitante,

Informamos que sua solicitação foi registrada em {data}, sob o protocolo {protocolo}.

O recebimento não implica aprovação do pedido. O andamento poderá ser consultado pelo canal de acompanhamento indicado no comprovante.

Atenciosamente,

Pró-Reitoria de Políticas Estudantis

Universidade Federal de Catalão

## 18 2 Solicitação de complementação

**Assunto:** PRPE \| Complementação de informações \| {protocolo}

Prezado(a) solicitante,

Para prosseguir com a análise de sua solicitação, solicitamos o envio de {informações necessárias}, até {data}, por meio do link específico disponibilizado nesta mensagem.

Caso haja dificuldade para apresentar as informações no prazo indicado, entre em contato pelo canal informado pelo setor.

Atenciosamente,

{setor responsável}

## 18 3 Aviso interno de atendimento restrito

**Assunto:** PRPE \| Atendimento pendente \| {protocolo}

Informamos que há atendimento pendente de providência no painel da PRPE, sob o protocolo {protocolo}. O acesso está limitado às pessoas autorizadas.

{link do painel interno}

## 18 4 Comunicação de resultado

**Assunto:** PRPE \| Atualização da solicitação \| {protocolo}

Prezado(a) solicitante,

Informamos que houve atualização da solicitação registrada sob o protocolo {protocolo}. Consulte o canal de acompanhamento para verificar as informações disponibilizadas pelo setor responsável.

Atenciosamente,

{setor responsável}

Resultados que possam ser comunicados diretamente por e-mail terão modelos específicos, aprovados pelo setor. Faixa de renda, documentos, dados de saúde e informações de apuração não serão inseridos em mensagens genéricas. Para pesquisas, substituir “solicitação” por “participação na pesquisa” e esclarecer quando não houver resposta individual prevista.

# **19 Arquitetura da solução**

A arquitetura proposta mantém Apps Script e Planilhas Google como base, utilizando Drive para anexos e MailApp para notificações. A separação em dois projetos permite autenticar a equipe sem conceder a cada servidor acesso direto às planilhas de dados. Trata-se de desenho de aplicação a validar na prova de conceito, não de recurso automático de permissões por linha do Google Sheets.

| Componente | Execução e responsabilidade |
| :---- | :---- |
| Projeto Portal Público e Núcleo | Executa como a conta institucional responsável. A implantação permite acesso sem login quando autorizado pela política do domínio. Recebe formulários, processa operações internas autenticadas e é o único gravador dos dados. |
| Projeto Painel da Equipe | Executa como o usuário que acessa. Obtém a identidade Google no servidor; não lê planilhas diretamente. Encaminha solicitações assinadas ao núcleo. |
| Planilhas privadas | Configuração, registros operacionais, conteúdos restritos, pesquisas, auditoria e fila de e-mail. Acesso direto limitado à administração técnica autorizada. |
| Google Drive privado | Anexos, evidências, exportações temporárias e backups com permissões controladas. |
| Gatilhos do núcleo | Processamento de e-mails, alertas, expiração de links, conciliação e backup; executam sob a conta que os instalou. |

## 19 1 Autenticação da equipe

Publicar o painel com acesso restrito ao domínio institucional e execução como usuário que o acessa, sujeito às opções disponíveis no Google Workspace da UFCAT. Solicitar os escopos mínimos de identidade e requisições externas. O primeiro acesso poderá apresentar autorização Google; conferir a concessão dos escopos necessários. \[R01, R02\]

O painel obterá Session.getActiveUser().getEmail() no servidor. Se a identidade estiver vazia, fora do domínio permitido ou sem cadastro ativo, negar a operação. Não utilizar e-mail digitado pelo navegador, parâmetro de URL ou getEffectiveUser() de aplicação executada pelo proprietário como prova de identidade do servidor.

A documentação informa que a disponibilidade do e-mail varia conforme execução e políticas. A exceção de mesmo domínio para execução como proprietário não deve ser pressuposta para o portal público. A prova de conceito verificará o comportamento com contas autorizadas, não cadastradas, externas, revogadas e múltiplas contas Google. \[R02\]

## 19 2 Comunicação entre projetos

O servidor do painel enviará ao doPost do núcleo um envelope com clientId, keyId, requestId, timestamp, nonce, ação, identidade obtida da sessão, payload e assinatura HMAC-SHA256. A assinatura ficará no corpo da requisição, pois o desenho não deve depender da exposição de cabeçalhos arbitrários no evento doPost. \[R01, R07\]

O núcleo verificará assinatura sobre representação canônica, emissor, janela curta de validade, nonce não utilizado, tamanho do conteúdo e lista de ações permitidas. Depois consultará o cadastro e as permissões do usuário para a ação e o objeto. Assinatura válida identifica o painel confiável; não substitui autorização do usuário.

As chaves ficarão em Script Properties, com rotação e acesso restrito aos editores. Nunca serão enviadas ao navegador. A prevenção de repetição usará registro persistente com expiração; cache será apenas otimização. O núcleo rejeitará chamadas internas não assinadas e jamais aceitará função arbitrária indicada pelo cliente.

# **20 Organização das bases e permissões**

Não se recomenda concentrar todo o conteúdo em uma planilha compartilhada com a equipe. Abas ocultas e proteção de intervalos não constituem segregação de leitura. O painel será o canal normal de acesso, com filtragem no servidor antes de qualquer envio ao navegador.

| Base lógica | Conteúdo | Regra de acesso |
| :---- | :---- | :---- |
| PRPE Configuração | Usuários, vínculos, setores, serviços, versões de formulário, regras e parâmetros. | Núcleo e administradores técnicos; administração funcional por API controlada. |
| PRPE Operação | Índice mínimo dos registros, movimentos, tarefas, agenda, pendências e vínculos. | Apenas por escopo; casos restritos excluídos de listagens e contagens não autorizadas. |
| PRPE Serviço Social | Respostas e documentos relacionados à análise socioeconômica e suas denúncias. | Permissão de Serviço Social e, quando necessário, do caso específico. |
| PRPE Psicologia | Dados administrativos de acolhimento e agendamento. | Equipe autorizada de Psicologia; sem prontuário clínico. |
| PRPE Denúncias MUC | Relatos, pessoas citadas e identidade protegida em estrutura separada. | Pessoas designadas, com controle de impedimentos e identidade. |
| PRPE Pesquisas e Gestão | Respostas de pesquisas, dimensões e agregados revisados. | Nutrição para análise; gestão recebe indicadores permitidos. |
| PRPE Controle Técnico | Fila de e-mail, auditoria, operações em recuperação, sequências e tokens. | Núcleo e operação técnica; conteúdo mínimo necessário. |

As bases representam arquivos ou partições lógicas a dimensionar após testes. O índice geral armazenará somente metadados indispensáveis. Nomes, e-mails e relatos deverão permanecer no compartimento correspondente quando a sua presença no índice ampliar indevidamente o acesso.

## 20 1 Dicionário do registro principal

| Grupo | Campos mínimos |
| :---- | :---- |
| Identificação | atendimento\_id UUID; protocolo único; tipo\_registro atendimento ou pesquisa; servico\_id; formulario\_versao; origem. |
| Tramitação | setor\_atual\_id; responsavel\_id; status; etapa; resultado; prioridade justificada; classificacao\_acesso; versao\_registro. |
| Datas | recebido\_em; criado\_em; atualizado\_em; primeiro\_contato\_em; concluido\_em; vencimento; regra\_prazo\_id. |
| Vínculos | referencia\_conteudo; protocolo\_relacionado; processo\_externo; id\_origem\_legado quando houver. |
| Integridade | chave\_idempotencia; operacao\_id; estado\_persistencia; criado\_por; atualizado\_por. |

Não armazenar linha de planilha como identidade do registro. Ordenações, arquivamentos e mudanças de estrutura não poderão alterar vínculos. Relacionamentos usarão UUIDs. Campos de data e número terão representação consistente; identificadores como matrícula e CPF serão texto para preservar zeros iniciais.

# **21 Dicionário das estruturas complementares**

| Estrutura | Chave e campos essenciais |
| :---- | :---- |
| Usuarios | usuario\_id; nome; email\_canonico único; ativo; validade; concessao\_por; ultimo\_acesso. |
| VinculosAcesso | vinculo\_id; usuario\_id; setor\_id; perfil; permissao; inicio; fim; aprovador. |
| Setores | setor\_id; nome; gestor; substituto; destinatarios\_homologados; ativo. |
| Servicos | servico\_id; setor\_padrao; fluxo\_id; sigilo\_padrao; regra\_prazo; ativo; vigencia. |
| Formularios e Campos | formulario\_id; versão; campo\_id estável; tipo; rótulo; opções; regra condicional; obrigatoriedade; sensibilidade; limite. |
| Respostas | registro\_id; formulario\_versao; campo\_id; valor tipado; versão de resposta; autoria e data. |
| Contatos | contato\_id; registro\_id; nome; email; telefone; matricula; curso; confirmado\_em; origem da informação. |
| IdentidadesProtegidas | identidade\_id; denuncia\_id; dados do denunciante; permissões próprias; histórico de consulta. |
| PessoasCitadas | pessoa\_citada\_id; denuncia\_id; tipo de vínculo no relato; dados estritamente necessários. |
| Movimentacoes | evento\_id; atendimento\_id; instante; ator; ação; valores operacionais anterior e posterior; justificativa. |
| Mensagens | mensagem\_id; atendimento\_id; autor; audiência; texto; data; versão; publicação. |
| Tarefas e Pendencias | item\_id; atendimento\_id; tipo; responsável; prazo; situação; conclusão. |
| Agendamentos | agenda\_id; atendimento\_id; profissional; início; fim; local ou modalidade; situação; versão. |
| Anexos | anexo\_id; atendimento\_id; drive\_file\_id; nome seguro; MIME; tamanho; hash; categoria; estado; autor; acesso. |
| Tokens | token\_id; registro\_id; nonce; digest; propósito; versão; expiração; uso; revogação; tentativas. |
| FilaEmail | mensagem\_id; evento\_id; destinatario\_ref; modelo\_versao; situação; tentativas; proxima\_execucao; reserva\_ate; erro. |
| Auditoria | auditoria\_id; ator; operação; objeto; instante; resultado; justificativa; campos alterados, com proteção dos valores. |
| Operacoes e Sequencias | operacao\_id; chave de idempotência; protocolo; etapa; erro; checkpoints; ano; próxima sequência. |
| Nonces e Limites | emissor; nonce; validade; estado; contadores técnicos de abuso e expiração. |
| PesquisaItens | pesquisa\_id; pergunta\_id; versão; valor; aplicabilidade; data\_refeicao; tipo\_refeicao; categoria agregada. |

Campos usados frequentemente para filtro serão colunas explícitas. Respostas variáveis poderão usar estrutura por campo, com validação tipada, sem criar uma coluna nova na planilha principal para cada pergunta. Textos livres não serão utilizados como fórmulas ou código.

O núcleo fará validação de unicidade, relacionamentos e transições, pois a planilha não oferece as garantias completas de um banco relacional. Recomenda-se um identificador de versão do esquema, migrações controladas e rotina de integridade para referências inexistentes, duplicidades e registros incompletos.

A tabela de auditoria terá escrita apenas por acréscimo na aplicação. Isso não a torna imutável perante o proprietário da planilha. Para evidência mais forte, prever exportações periódicas para área restrita e controles institucionais de auditoria; requisitos de imutabilidade absoluta demandarão infraestrutura adicional.

# **22 Controle de gravações e recuperação**

**Todas as gravações funcionais deverão passar pelo mesmo projeto núcleo.** LockService.getScriptLock() protege execuções daquele projeto; dois projetos distintos não compartilham o mesmo bloqueio. O painel não escreverá diretamente nas bases, nem gatilhos externos alterarão tabelas operacionais. \[R03\]

O bloqueio será curto e protegerá reserva de protocolo, verificação de duplicidade e atualização crítica. Processamento de arquivos, envio de e-mail e cálculos extensos ocorrerão fora dele. Usar tryLock com tempo limitado e resposta de tentativa posterior, sem manter requisições aguardando indefinidamente. Edições adotarão comparação de versao\_registro e rejeição de atualização sobre versão antiga.

Planilhas e Drive não oferecem uma transação única que englobe todo o atendimento, seus anexos e o e-mail. Implementar um diário de operações com etapas **iniciada**, **dados persistidos**, **anexos vinculados**, **eventos conciliados** e **confirmada**. Cada etapa será repetível sem duplicação, com identificadores derivados da operação.

Em falha parcial, a rotina de conciliação retomará o ponto pendente. A existência do registro principal será verificada pela chave e pelo protocolo antes de inserir novamente. Eventos ou notificações ausentes serão recriados a partir do diário; arquivos órfãos serão isolados e eliminados apenas após prazo e verificação. O recibo definitivo só será exibido após confirmar os componentes obrigatórios da submissão.

Uma tentativa repetida poderá consultar o andamento da própria submissão com comprovante temporário protegido. Não devolver dados de outra pessoa apenas porque sua chave de idempotência foi informada. Caso a operação ainda esteja em recuperação, apresentar instrução clara de aguardar e tentar novamente, mantendo a mesma chave.

## 22 1 Rotinas programadas

| Rotina | Frequência inicial proposta |
| :---- | :---- |
| Fila de notificações | A cada cinco minutos, com lotes limitados. |
| Conciliação de operações | A cada dez minutos ou conforme demanda observada. |
| Expiração de tokens e limpeza técnica | A cada hora, sem eliminar registros administrativos. |
| Prazos e escalonamentos | A cada hora durante funcionamento, conforme regra de serviço. |
| Indicadores agregados | A cada hora ou diariamente, segundo volume. |
| Backup | Diário, com verificação do resultado. |
| Revisão de integridade | Diária, com relatório técnico sem conteúdo pessoal. |

Gatilhos serão instalados pela conta institucional responsável e documentados em inventário. Não depender de onEdit para detectar gravações feitas pelo próprio script: eventos e notificações deverão ser produzidos explicitamente pela lógica de negócio. \[R08\]

# **23 Organização do código e contratos de operação**

O desenvolvimento deverá utilizar versionamento Git e ambientes separados de desenvolvimento, homologação e produção. O uso de clasp poderá apoiar a sincronização, observadas as políticas da área de TI. Credenciais, IDs privados e segredos não integrarão o repositório.

| Projeto ou módulo | Responsabilidade |
| :---- | :---- |
| PortalPublico e componentes HTML | Catálogo, renderização dos formulários, envio, recibo e acompanhamento. |
| PainelEquipe e componentes HTML | Listagem autorizada, detalhe, gestão, agenda, pesquisas e administração. |
| AuthService e AccessPolicy | Identidade, assinatura entre servidores, perfis, setores, casos e restrição de campos. |
| CatalogService e ValidationService | Esquemas versionados, opções, ramificações e validação no servidor. |
| AtendimentoService e WorkflowService | Criação, tramitação, atribuição, decisões, prazos e reabertura. |
| ProtocolService e RecoveryService | Sequência, idempotência, bloqueios e conciliação. |
| Repository | Leitura e escrita em lote, índices, mapeamento de colunas e migrações. |
| AttachmentService e NotificationService | Arquivos, permissões, modelos e fila de e-mail. |
| AuditService e ReportService | Trilhas, exportações e agregados autorizados. |
| Jobs e Config | Rotinas programadas, parâmetros, IDs dos ambientes e verificação de saúde. |

## 23 1 Operações expostas

No portal, permitir apenas consulta do catálogo público, início de submissão, envio de anexo temporário, conclusão do formulário, confirmação de contato, acompanhamento protegido e complementação autorizada. No painel, permitir operações explícitas de consulta, atribuição, movimentação, mensagem, agendamento, decisão, exportação e administração.

As funções auxiliares do núcleo terminarão com sublinhado e não ficarão disponíveis por google.script.run. Cada função pública de entrada validará identidade ou capacidade temporária, esquema, limites e finalidade. O nome de uma função oculta ou uma URL desconhecida não serão usados como segredo. \[R06\]

As chamadas internas utilizarão envelope padronizado e resposta com ok, code, requestId, data e mensagem segura. Usar códigos de aplicação como ACCESS\_DENIED, VALIDATION\_ERROR, VERSION\_CONFLICT, RETRY\_LATER e NOT\_FOUND, sem depender de cabeçalhos ou códigos HTTP personalizados que não sejam suportados pela interface adotada. Nenhum erro deverá expor pilha de execução, chave, ID privado ou relato.

Listagens usarão paginação e campos mínimos. Parâmetros de filtro serão validados; a autorização precederá contagens e agregações. Resultados de serviços restritos não poderão ser inferidos por diferenças em buscas gerais. Datas transmitidas pela interface serão strings ISO, respeitando os tipos aceitos por google.script.run. \[R06\]

# **24 Proteção de arquivos e dados**

## 24 1 Política de anexos

Propor, para a primeira versão, PDF, JPEG e PNG, até **5 MB por arquivo**, **cinco arquivos** e **15 MB no total por submissão**. São limites da aplicação a homologar em testes, não limites oficiais universais do Apps Script. A quantidade poderá ser menor conforme o serviço. Arquivos maiores, áudios e vídeos terão orientação de entrega por canal institucional específico, sem exposição pública.

O upload público utilizará HTML Service e tratamento no servidor, que salvará os arquivos sob a conta institucional. O envio de um formulário com campo de arquivo pode chegar como Blob ao Apps Script. Testar envio sequencial, interrupção, recuperação e vinculação por sessão temporária; não pressupor a transferência de grandes lotes em uma só chamada. \[R06\]

Validar tamanho real, extensão, assinatura do formato, nome, finalidade e vínculo da submissão. Bloquear executáveis, HTML, SVG ativo, arquivos compactados e documentos com macros na versão inicial. Não executar ou renderizar conteúdo arbitrário. A validação do formato não equivale a análise antivírus: definir com a TI um procedimento de quarentena e verificação, ou integração específica, antes de liberar abertura de documentos não confiáveis.

Salvar anexos em pastas privadas, com nomes técnicos sem CPF ou nome do denunciante. Registrar hash de integridade e preservar o original de evidências. A abertura pela equipe exigirá nova autorização no servidor e poderá usar transferência mediada em tamanho limitado, sem conceder link público do Drive. Se houver permissão direta excepcional por arquivo, ela deverá ser nominativa, registrada e revogada quando cessar a necessidade. Nunca usar “Qualquer pessoa com o link”.

## 24 2 Controles de proteção

Aplicar escape de HTML e texto, evitar innerHTML com conteúdo recebido, validar toda entrada e gravar conteúdo de planilha como texto literal. Neutralizar injeção de fórmulas na escrita e nas exportações, especialmente entradas iniciadas por \=, \+, \- ou @. Limitar campos, chamadas, arquivos e volume por intervalo; usar proteção contra robôs validada no servidor, com alternativa acessível e teste no domínio efetivo do HTML Service.

O evento de web app não oferece, como base confiável de projeto, o IP real do visitante. Não depender de bloqueio por IP. Combinar limites globais, tokens de submissão, mecanismos antiautomação e monitoramento; reconhecer que Apps Script, isoladamente, não garante proteção contra ataques volumétricos. Prever interrupção controlada do recebimento e canal de contingência.

Não incluir rastreadores publicitários, segredos, tokens ou conteúdo pessoal em logs. Separar exportações, restringir downloads e registrar leituras relevantes de casos sigilosos. Informações mínimas de operação e indicadores serão preferidas à cópia de relatos em várias planilhas.

## 24 3 Governança dos dados

Documentar finalidade, necessidade, hipótese legal, compartilhamentos e retenção de cada serviço, com avaliação da PRPE, da TI e do encarregado de dados. A LGPD exige tratamento compatível com a finalidade e medidas de proteção; dados sensíveis requerem análise específica. A ciência do aviso não deve substituir a identificação da base legal aplicável. \[R09, R10\]

Definir tabela de temporalidade e procedimento de correção, acesso, eliminação quando cabível e preservação por obrigação administrativa. Não prometer exclusão imediata ou portabilidade irrestrita. Prever revisão de risco e de eventual relatório de impacto, especialmente para denúncias e dados sensíveis. O uso de Google Workspace deverá observar o contrato e as políticas institucionais; não presumir localização nacional dos dados nem conformidade automática pela escolha da ferramenta.

# **25 Indicadores e continuidade operacional**

## 25 1 Indicadores de gestão

| Indicador | Definição operacional |
| :---- | :---- |
| Demanda recebida | Quantidade de protocolos de atendimento por período, serviço, setor e origem. Pesquisas contadas separadamente. |
| Estoque pendente | Atendimentos ainda não concluídos, cancelados ou arquivados na data de referência. |
| Primeiro contato | Intervalo entre recebimento e primeiro contato efetivo registrado; informar mediana e percentil 90\. |
| Tempo de resolução | Intervalo entre recebimento e conclusão, com apresentação do tempo total e útil. |
| Cumprimento de prazo | Casos sujeitos a prazo e atendidos no prazo divididos pelo total elegível; explicitar a população de referência. |
| Reabertura e retrabalho | Reaberturas, complementações e mudanças de setor, sem interpretar automaticamente como falha. |
| Agendamento | Tempo de espera, comparecimentos, faltas e remarcações, por escopo autorizado. |
| Satisfação | Média e distribuição por item e versão do questionário, com número de respostas válidas e exclusão de não aplicáveis. |
| Comunicação | Mensagens pendentes, enviadas ao serviço, falhas e resultados incertos. |

Relatórios gerais não conterão nome, CPF, apartamento, relato ou classificação sensível desnecessária. Adotar supressão de grupos pequenos, inicialmente com limiar proposto de cinco registros, e revisar riscos de reidentificação por combinação de filtros. A supressão isolada não garante anonimização. Exportações de dados individuais exigirão finalidade, permissão específica e registro de auditoria. Pesquisas abertas terão participação voluntária; os resultados não representarão necessariamente toda a comunidade. Sem autenticação, não se garantirá uma única resposta por pessoa, embora sejam controladas repetições técnicas do mesmo envio.

## 25 2 Capacidade e limites

Na documentação consultada em 28 de outubro de 2026, Apps Script informa limite de seis minutos por execução, trinta execuções simultâneas por usuário e mil por script. Para contas Workspace, a tabela informa 1.500 destinatários de e-mail por dia, com regra própria de 2.000 destinatários internos ao domínio; quotas variam por conta e podem mudar. Não somar esses valores como capacidade garantida. \[R04\]

Como o núcleo executará sob uma conta responsável, o limite por usuário deverá orientar o teste de carga. Usar operações em lote, índices, paginação, cache apenas para aceleração e agregação programada. Quota de e-mail mede destinatários, não atendimentos. Exemplo de dimensionamento: 200 atendimentos por dia com quatro destinatários acionados ao longo do fluxo podem consumir 800 entregas, além de alertas e reenvios.

Premissa inicial para teste: até vinte integrantes da equipe, 200 novos registros por dia e picos de dez submissões simultâneas, sem arquivos grandes. Esses números são cenário de dimensionamento a substituir pelo volume real. Metas propostas: listagem no percentil 95 em até três segundos e submissão sem anexo em até oito segundos, medidas na homologação; não são garantias do provedor.

## 25 3 Continuidade

Definir cópia diária de bases e anexos, verificação de integridade e teste periódico de restauração. Meta inicial sugerida: perda máxima de 24 horas de dados e recuperação em um dia útil, sujeita à validação da TI. A frequência de backup deverá ser ampliada se essas metas forem insuficientes. Histórico de versões do Google não substituirá, isoladamente, o plano de recuperação.

Backups permanecerão em área institucional restrita e segregada, com retenção e acesso próprios. Registrar manifesto de arquivos, versão do esquema e ponto de recuperação; conferir consistência entre bases e anexos e conciliar operações em andamento, pois cópias separadas não constituem uma transação única. Uma restauração deverá conferir protocolos e mensagens antes da retomada para evitar duplicidades. Monitorar quota, duração, falhas, idade do item mais antigo da fila e último backup bem-sucedido. Desempenho persistentemente insuficiente, exigência de alta disponibilidade, grandes arquivos ou auditoria imutável justificarão revisão da base tecnológica.

# **26 Etapas de desenvolvimento e estimativa de esforço**

O cronograma abaixo pressupõe um desenvolvedor com dedicação principal, apoio da TI e disponibilidade semanal dos representantes dos setores. O esforço estimado é de **300 a 450 horas**, distribuídas em aproximadamente **dez a doze semanas**. O calendário dependerá de acessos, homologações e resultado da prova de conceito; não constitui orçamento de contratação.

| Etapa | Período indicativo | Entrega e condição de conclusão |
| :---- | :---- | :---- |
| 1 Levantamento e decisões | Semana 1 | Catálogo, responsáveis, campos, prazos, requisitos de sigilo e matriz de acesso aprovados. |
| 2 Prova de conceito técnica | Semana 2 | Envio sem login; autenticação de dois servidores; chamada assinada; escrita central; upload privado; e-mail e concorrência verificados. |
| 3 Estrutura e segurança | Semanas 3 e 4 | Bases, perfis, cadastro, protocolo, idempotência, auditoria e recuperação. |
| 4 Portal e formulários | Semanas 5 e 6 | Dez entradas, condicionais, recibos, anexos e consulta protegida. |
| 5 Gestão e automações | Semanas 7 e 8 | Fila de trabalho, tramitação, agenda, decisões, e-mails e prazos. |
| 6 Pesquisas e relatórios | Semana 9 | Indicadores, filtros de acesso, exportações e comparação por versão. |
| 7 Homologação e piloto | Semanas 10 e 11 | Testes, treinamento, operação acompanhada e correções prioritárias. |
| 8 Entrada em produção | Semana 12 | Publicação, revisão dos canais antigos, contingência e aceite final. |

Distribuição indicativa: levantamento e privacidade, 30 a 45 horas; prova de conceito e segurança, 45 a 65; base e fluxos, 60 a 90; formulários e interfaces, 70 a 100; relatórios e automações, 40 a 60; testes, implantação e documentação, 55 a 90\. O total será refinado após a etapa 2\.

**Marco técnico obrigatório:** comprovar que a política do Google Workspace permite recebimento anônimo e a autenticação prevista para a equipe. Se houver bloqueio institucional ao acesso público, o requisito de não autenticar estudantes exigirá ajuste autorizado da política ou outro ponto de entrada. Não se deverá contornar a restrição por conta pessoal nem introduzir login discente silenciosamente.

O piloto poderá começar com GE01 e comunicação comum da MUC para validar operação. Serviço Social, Psicologia e denúncias somente serão abertos depois da homologação de seus controles. O aceite final abrangerá os dez serviços; o piloto não será considerado entrega do escopo completo.

## 26 1 Recursos e custos a dimensionar

Considerar horas de desenvolvimento, acompanhamento dos setores, manutenção, armazenamento no Drive, política de licenças Workspace, solução antiautomação, eventual verificação de arquivos e continuidade. Não presumir custo zero por utilizar Apps Script. Não foram fixados valores de contratação ou preços de serviços externos.

Entregáveis: código versionado, manifesto e configurações por ambiente, dicionário de dados, formulários versionados, matriz de acesso, roteiros de implantação e recuperação, manual da equipe, orientações ao solicitante, plano de testes e evidências de homologação.

# **27 Testes e critérios de aceite**

Os cenários abaixo deverão usar dados fictícios em homologação. A evidência deverá identificar versão, conta de teste, resultado esperado, resultado observado e responsável pela validação.

| ID | Cenário | Critério de aceite |
| :---: | :---- | :---- |
| T01 | Envio em janela anônima | Todos os formulários públicos funcionam sem conta Google, inclusive anexos permitidos. |
| T02 | Autenticação da equipe | Conta Google autorizada entra; conta externa, inativa ou não cadastrada é recusada. |
| T03 | Fraude de identidade | Alterar e-mail, perfil ou setor no navegador não concede acesso ou autoria. |
| T04 | Operação interna direta | Chamada sem assinatura, expirada ou com nonce reutilizado é negada. |
| T05 | Isolamento de setores | Técnico não acessa casos fora do escopo por URL, busca, contagem, exportação ou download. |
| T06 | Denunciante protegido | Identidade não aparece em fila geral, e-mail, relatório ou acesso sem concessão própria. |
| T07 | Denúncia anônima | Envio não exige identificadores e permite recibo com código reservado. |
| T08 | Catálogo completo | Nove instrumentos e Outros assuntos são acessíveis e encaminhados corretamente. |
| T09 | Condicionais | Pós-graduação, benefícios, CEP, alimentos consumidos e outros campos seguem regras homologadas. |
| T10 | Protocolo concorrente | Dez envios simultâneos geram dez protocolos únicos; repetição da mesma submissão gera um único registro. |
| T11 | Falha parcial | Interrupção entre etapas permite conciliação sem duplicar atendimento, arquivo ou evento. |
| T12 | Edição simultânea | Alteração sobre versão antiga é recusada com orientação para recarregar. |
| T13 | Consulta pública | Protocolo isolado não revela existência ou conteúdo; token inválido, revogado ou expirado é recusado. |
| T14 | Anexos | Arquivo acima do limite ou com formato incompatível é rejeitado; arquivo válido permanece privado. |
| T15 | Quota e falha de e-mail | Atendimento é preservado; fila adia ou sinaliza falha e permite tratamento de resultado incerto. |
| T16 | Calendário e prazos | Feriados, fim de semana, virada anual, pausas e reabertura produzem contagem homologada. |
| T17 | Acesso ao RU | Decisão favorável e efetivação são etapas distintas; valor e vigência aparecem somente após validação. |
| T18 | Pesquisas | Não aplicáveis não viram zero; versão é preservada; retorno individual gera atendimento relacionado. |
| T19 | Entrada maliciosa | HTML e fórmulas não são executados; erro não revela detalhes privados. |
| T20 | Revogação e impedimento | Próxima chamada do usuário revogado é negada; pessoa impedida deixa de receber dados e alertas. |
| T21 | Agenda e acessibilidade | Sem sobreposição indevida; formulário utilizável em celular, teclado e leitor de tela. |
| T22 | Restauração | Backup recupera bases e anexos de amostra e retoma fila sem reenvios indiscriminados. |

O aceite exigirá ausência de falha crítica de sigilo, autorização, perda de registro e duplicidade de protocolo. Pendências de apresentação poderão ser priorizadas, mas não dispensarão a conclusão do escopo. Testes de carga deverão medir tempos, concorrência e quotas no ambiente institucional, inclusive com o tamanho máximo de arquivo proposto.

# **28 Implantação e governança**

## 28 1 Preparação e publicação

1\. Designar responsável de negócio, responsável técnico, administradores funcionais e representantes dos setores.

2\. Criar ambientes isolados, contas e pastas institucionais; configurar permissões e verificação em duas etapas.

3\. Validar as políticas de acesso anônimo e OAuth, os escopos, os projetos Google Cloud pertinentes e os manifestos.

4\. Instalar bases, parâmetros e primeiro administrador; publicar versões de homologação e executar a prova de conceito.

5\. Homologar formulários, acesso, mensagens, prazos, anexos, aviso de privacidade e procedimento de denúncias.

6\. Instalar gatilhos pela conta responsável; testar fila, alertas, backup e recuperação.

7\. Capacitar a equipe com casos fictícios e roteiro por perfil; realizar piloto controlado.

8\. Publicar versão de produção, divulgar o canal institucional e atualizar links dos formulários antigos de forma coordenada.

Não desativar instrumentos antigos antes da validação do novo canal e da comunicação aos setores. Definir data de corte, tratamento de respostas tardias e responsável por conciliar entradas remanescentes. Se forem importados registros históricos, fazer inventário e autorização específicos, preservando origem e data; não disparar notificações retroativas por padrão.

## 28 2 Responsabilidades

| Papel institucional | Responsabilidade |
| :---- | :---- |
| Direção da PRPE | Aprovar escopo, prioridades, competências e critérios de aceite. |
| Representantes dos setores | Validar formulários, prazos, decisões, textos e restrições de acesso. |
| Administração funcional | Manter usuários, catálogo, destinatários e parâmetros; revisar concessões. |
| Desenvolvimento | Implementar, documentar, testar e corrigir a solução. |
| TI institucional | Validar domínio, contas, segurança, operação, capacidade e recuperação. |
| Encarregado e instâncias de proteção de dados | Orientar avaliação do tratamento, avisos, riscos e procedimentos pertinentes. |
| Equipe de atendimento | Registrar providências, conferir dados, responder e manter a tramitação atualizada. |

A operação deverá prever verificação diária de filas e falhas, revisão periódica de acessos, teste de restauração e atualização do catálogo. Mudanças em campos e regras deverão gerar nova versão, responsável e vigência. O responsável técnico manterá procedimento de troca da conta publicadora e reinstalação de gatilhos, evitando dependência de uma pessoa.

No retorno a versão anterior, preservar dados recebidos e compatibilidade do esquema; não restaurar automaticamente uma planilha antiga sobre a base atual. Em incidente, suspender funções afetadas, preservar evidências e acionar os responsáveis institucionais. A avaliação e eventual comunicação de incidente observarão o procedimento institucional e a regulamentação aplicável.

# **29 Decisões para início do desenvolvimento**

O desenvolvimento poderá iniciar com as premissas deste planejamento. As decisões abaixo deverão ser registradas nos marcos indicados, para evitar que dúvidas de negócio sejam resolvidas silenciosamente no código.

| Decisão | Responsável pela definição | Marco |
| :---- | :---- | :---- |
| Nomes dos setores, responsáveis e substitutos | PRPE | Encerramento do levantamento. |
| Competência para análise e efetivação do acesso ao RU | PRPE, Serviço Social e gestão do RU | Antes do fluxo RU01. |
| Faixas de renda, valores, semestres e opções não visíveis no PDF | Serviço Social e gestão do RU | Antes da publicação de RU01. |
| Base legal, dados mínimos e retenção por serviço | PRPE e instâncias de proteção de dados | Antes do uso de dados reais. |
| Campos sensíveis do acolhimento psicológico | Psicologia | Homologação de PS01. |
| Anonimato, identidade protegida e impedimentos | Setores responsáveis por denúncias | Homologação de SS02 e MU02. |
| Prazo de dez dias úteis do modelo de denúncia social | Serviço Social e instância competente | Antes de ativar a regra. |
| Prazos dos demais serviços e calendário | Gestores de setor | Homologação dos fluxos. |
| Domínio, contas, publicação anônima e OAuth | TI institucional | Prova de conceito. |
| Destinatários, remetente e Reply-To | Administração funcional e setores | Antes de ativar e-mails. |
| Política de anexos, evidências grandes e verificação de arquivos | TI e setores | Prova de conceito e homologação. |
| Volume esperado e metas de recuperação | PRPE e TI | Antes do teste de capacidade. |

## 29 1 Priorização do desenvolvimento

**Fundação:** identidade e acesso, segregação, escrita central, protocolo, histórico, cadastro e recuperação. Nenhuma funcionalidade sensível será publicada antes desses componentes.

**Atendimento:** dez entradas, validação, roteamento, responsáveis, mensagens, anexos, situações, prazos, agenda e notificações. Este conjunto compõe a versão inicial completa.

**Gestão:** pesquisas separadas, relatórios por escopo, exportações controladas, monitoração e manuais. Entregar antes do aceite final, ainda que o piloto use apenas parte dos serviços.

**Evolução posterior:** integração autorizada com SIGAA, SEI, controle operacional do RU, Google Calendar e serviços especializados de armazenamento ou envio. Cada integração exigirá credenciais, interface oficial disponível, competência definida e análise de proteção de dados. O planejamento não presume que essas interfaces já estejam disponíveis.

## 29 2 Resultado esperado

A entrega deverá permitir que a PRPE acompanhe cada demanda desde o recebimento até a conclusão, com rastreabilidade, responsabilidade definida e comunicação ao solicitante. A equipe trabalhará por um painel autenticado; estudantes utilizarão formulários e acompanhamento limitado, sem se tornarem usuários cadastrados. A opção Outros assuntos garantirá acolhimento de demandas ainda não cobertas pelo catálogo.

# **30 Fontes documentais e referências técnicas**

## 30 1 Instrumentos anexados

| ID | Documento analisado | Extensão |
| :---: | :---- | :---: |
| A01 | Requerimento para Atendimento com Serviço Social PRPE\_UFCAT 2026.pdf | 7 páginas. |
| A02 | FORMULARIO\_REGISTRO\_DE\_DENUNCIA\_0efd2dd5ed.pdf | 2 páginas. |
| A03 | Agendamento para acolhimento psicológico \- PRPE.pdf | 3 páginas. |
| A04 | LIBERAÇÃO DE ACESSO AO RESTAURANTE UNIVERSITÁRIO.pdf | 5 páginas. |
| A05 | FORMULÁRIO DE SOLICITAÇÃO DE PARCERIAS NO RU.pdf | 5 páginas. |
| A06 | Pesquisa de Satisfação do Usuário \- RU.pdf | 13 páginas. |
| A07 | Pesquisa de Satisfação do Usuário da lanchonete\_cantina.pdf | 16 páginas. |
| A08 | Fale com a MUC\!.pdf | 3 páginas. |
| A09 | MUC \- CANAL DE DENÚNCIA.pdf | 5 páginas. |

Os instrumentos fundamentam o catálogo e os campos descritos. Alterações propostas estão identificadas como recomendações e dependem de homologação pelos setores. Opções de listas fechadas que não aparecem nas impressões deverão ser obtidas do formulário original ou do setor responsável antes da configuração.

## 30 2 Referências oficiais

Consultadas em 28 de outubro de 2026\. A documentação do Google deverá ser revista na implantação, sobretudo quanto a quotas, OAuth e opções de publicação.

\[R01\] Google. Web Apps. Execução, publicação e eventos de web apps.

[https\://developers.google.com/apps-script/guides/web](https://developers.google.com/apps-script/guides/web)

\[R02\] Google. Class Session. Identidade ativa e identidade efetiva.

[https\://developers.google.com/apps-script/reference/base/session](https://developers.google.com/apps-script/reference/base/session)

\[R03\] Google. Class LockService. Escopo dos bloqueios de execução.

[https\://developers.google.com/apps-script/reference/lock/lock-service](https://developers.google.com/apps-script/reference/lock/lock-service)

\[R04\] Google. Quotas for Google Services. Quotas e limites de execução.

[https\://developers.google.com/apps-script/guides/services/quotas](https://developers.google.com/apps-script/guides/services/quotas)

\[R05\] Google. Class MailApp. Envio e quota disponível de destinatários.

[https\://developers.google.com/apps-script/reference/mail/mail-app](https://developers.google.com/apps-script/reference/mail/mail-app)

\[R06\] Google. HTML Service Communicate with Server Functions. Comunicação, parâmetros, arquivos e funções privadas.

[https\://developers.google.com/apps-script/guides/html/communication](https://developers.google.com/apps-script/guides/html/communication)

\[R07\] Google. Class Utilities. Funções de resumo e HMAC-SHA256.

[https\://developers.google.com/apps-script/reference/utilities/utilities](https://developers.google.com/apps-script/reference/utilities/utilities)

\[R08\] Google. Installable Triggers. Identidade de execução e gatilhos temporais.

[https\://developers.google.com/apps-script/guides/triggers/installable](https://developers.google.com/apps-script/guides/triggers/installable)

\[R09\] Brasil. Lei nº 13.709, de 14 de agosto de 2018\. Texto atualizado disponibilizado pela Câmara dos Deputados, especialmente arts. 6º, 7º, 11, 23 e 46\.

[https\://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html)

\[R10\] ANPD. Guia orientativo Tratamento de dados pessoais pelo Poder Público. Orientações sobre bases legais, necessidade e transparência.

[https\://www\.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia\_orientativo\_tratamento\_de\_dados\_pessoais\_pelo\_poder\_publico](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_tratamento_de_dados_pessoais_pelo_poder_publico)

\[R11\] Presidência da República. Manual de Redação da Presidência da República. Referência de clareza, objetividade, impessoalidade e padronização das comunicações.

[https\://www\.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica](https://www.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica)