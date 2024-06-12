
from django.http import JsonResponse
from django.contrib.auth.models import User, Permission
from django.contrib.auth import authenticate, logout, login
from django.contrib.contenttypes.models import ContentType
import json
from employee.models import Employee
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

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

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, reques, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AccountView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            if User.objects.filter(username=data['username']).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            user = User.objects.create_user(
                username=data['username'], password=data['password'],
            )
            content_type = ContentType.objects.get_for_model(Employee)

            permissions = Permission.objects.filter(content_type=content_type)
            for permission in user.get_all_permissions():
                for permission in permissions:
                    user.user_permissions.remove(permission)
            user.save()
            return JsonResponse({'message': 'User registered successfully'}, status=201)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)