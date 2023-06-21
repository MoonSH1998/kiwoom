<%@ page contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="core.*" %>
<%@ page import="util.Mail" %>
<%
    //rec: rec_, gender: gender, city_name: AddrKo.getCityName(addrcode),
    String addrcode = request.getParameter("addrcode");
    String jsonArray = request.getParameter("jsonArray");

    (new UserDAO()).getUserToRec(addrcode, jsonArray);

%>
