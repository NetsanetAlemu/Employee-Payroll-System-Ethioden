from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('add', views.add_employee),
    path('list', views.get_employees),
    path('update/<id>/', views.update_employee),
    path('upload-profile-picture/<id>/', views.upload_profile_pic),
    path('get-profile-picture/<id>/', views.get_profile_pic),
    path('refresh-token', views.refresh_token, name='refresh_token')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
