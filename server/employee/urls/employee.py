from django.urls import path

from employee.views import views, salary_view
from employee.views.user_views import ProfilePicture

# Defining  url patterns to use it as end point
urlpatterns = [
    path('list', views.EmployeeView.as_view(), name="__list_emplyees__"),
    path('add', views.EmployeeView.as_view(), name='__add_emoployee__'),
    path('allowance/add/<employee_id>/<allowance_type>', views.EmployeeView.as_view(), name='__add_allowance_to_employee__'),
    path('edit/<employee_id>', views.EmployeeView.as_view(),
         name='__edit_emoployee__'),
    path('delete/<employee_id>', views.EmployeeView.as_view(),
         name='__delete_emoployee__'),
    path("salary/get/<employee_id>",
         salary_view.SalaryView.as_view(), name='__get_emp_salary__'),
    path("allowance/add/<employee_id>/<allowance_type>",
         views.EmployeeView.as_view(), name='__add_allowance_to_emp__'),
    path("deduction/add/<employee_id>/<deduction_type>",
         views.EmployeeView.as_view(), name='__add_deduction_to_emp__'),
    path("overtime/add/<employee_id>/<overtime_type>",
         views.EmployeeView.as_view(), name='__add_overtime_to_emp__'),
    path("salary/get", salary_view.SalaryView.as_view(), name='__get_salary__'),
    path("salary/get/<int:year>/<int:curr_month>",
         salary_view.SalaryView.as_view(), name='__get_salary_by_month__'),
    path('get/<str:id>', views.EmployeeView.as_view(), name='__get_emoploye__'),
    path('update/<str:id>/', views.EmployeeView.as_view(),
         name='__update_emoployee__'),
    path("profile/<str:employee_id>",
         ProfilePicture.as_view(), name='__update_emp_profile_picture__'),

] 