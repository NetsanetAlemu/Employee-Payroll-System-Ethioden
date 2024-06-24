from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from employee.views import position

urlpatterns = [
    path('list', position.PositionView.as_view(), name="__list_positions__"),
    path('add', position.PositionView.as_view(), name='__add_position__'),
    path('edit/<position_id>', position.PositionView.as_view(),
         name='__edit_position__'),
    path('delete/<position_id>', position.PositionView.as_view(),
         name='__delete_position__'),
    path('get/<str:id>', position.PositionView.as_view(), name='__get_position__'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)