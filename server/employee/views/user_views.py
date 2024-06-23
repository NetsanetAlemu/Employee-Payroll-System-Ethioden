
from tokenize import TokenError
from django.http import JsonResponse
from django.contrib.auth.models import User, Permission, Group
from django.contrib.auth import authenticate, logout, login
from django.shortcuts import get_object_or_404
from django.contrib.contenttypes.models import ContentType
import json
from employee.models import Employee
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import InvalidToken

from employee.serializers.serializers import EmployeeSerializer
# from serializers.serializers import EmployeeSerializer


class UserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        logout(request)

        return Response("Logged out", status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        data = request.data
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.save()
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AccountView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            if Employee.objects.filter(id=data['empID']).exists():

                empoyee = Employee.objects.get(id=data['empID'])
                if User.objects.filter(username=data['username']).exists():
                    return JsonResponse({'error': 'Username already exists'}, status=400)
                if empoyee.user:
                    return JsonResponse({'error': 'There is an other user registed in this ID Please check your ID '}, status=400)
                user = User.objects.create_user(
                    username=data['username'], password=data['password'],
                )
                empoyee.user = user
                empoyee.save()
                group, created = Group.objects.get_or_create(name="employee")
                group, created = Group.objects.get_or_create(
                    name='add_emplyee')

                permissions = Permission.objects.filter(
                    codename__in=['add_employee', 'change_employee'])
                group.permissions.set(permissions)
                group.save()
                user.groups.add(group)
                user.save()
                return JsonResponse({'message': 'User registered successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Employee does not exist \n Check Your ID'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        data = super().post(request=request)
        user = User.objects.get(username=request.data['username'])
        employee = get_object_or_404(Employee, user=user)
        if employee:
            data.data['employee'] = EmployeeSerializer(employee).data
        else:
            pass
        return Response(data=data.data, status=status.HTTP_200_OK)