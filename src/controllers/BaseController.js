export class BaseController {
  handleSuccess(res, data) {
    res.json({
      success: true,
      message: 'Operação realizada com sucesso',
      data
    });
  }

  handleError(res, error, context) {
    console.error(`Error in ${context}:`, error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
}
