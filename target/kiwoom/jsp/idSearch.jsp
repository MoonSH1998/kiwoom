<%@ page contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="core.*" %>
<%

    String name = request.getParameter("name");
    String gender = request.getParameter("gender");
    String tel = request.getParameter("tel");
    String birth = request.getParameter("birth");
    String email = request.getParameter("email");
    out.print((new UserDAO()).searchId(name, gender, birth, tel , email));
%>
