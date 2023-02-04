exports.mockRequest = ()=>{
    const req = {}
   req.query = jest.fn().mockReturnValue(req);
   req.body = jest.fn().mockReturnValue(req);
   req.params = jest.fn().mockReturnValue(req);
   return req;
}
exports.mockResponse = ()=>{
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res;
}