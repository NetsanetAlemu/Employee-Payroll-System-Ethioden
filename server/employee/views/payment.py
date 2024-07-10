from datetime import date
import json
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from django.http.response import JsonResponse
from employee.utils.search import Search
from employee.serializers.employee import EmployeeSerializer
from employee.serializers.payment import PaymentSerializer, MonthlyPaymentSerializer
from employee.views.employee import StandardResultsSetPagination
from ..models import Employee, Payment, Salary
import month


class PaymentView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request: Request, employee_id=None, year=None, curr_month=None):
        if employee_id:
            employee = Employee.objects.get(id=employee_id)
            total_year = year if year is not None else 2022
            curr_month = curr_month if curr_month is not None else 13
            if year and curr_month:
               res = self.create_payment(employee=employee,
                                         month=month.Month(year, curr_month))
               if res:
                   return Response("success", status=201)
               else:
                   return Response("error", status=404)
            elif year:
                for curent_month in range(1, 13):
                    curr_month = month.Month(year, curent_month)
                    self.create_payment(
                        employee=employee, month=curr_month)
            else:
                for year in range(2022, 2025):
                    for curr_month in range(1, 13):
                      self.create_payment(employee, month=curr_month)
        else:
            employees = Employee.objects.all()
            for employee in employees:
                if year and curr_month:
                    res = self.create_payment(employee=employee,
                                              month=month.Month(year, curr_month))
                elif year:
                    for curent_month in range(1, 13):
                        curr_month = month.Month(year, curent_month)
                        self.create_payment(
                            employee=employee, month=curr_month)
                else:
                    for year in range(2022, 2025):
                        for curr_month in range(1, 13):
                            self.create_payment(employee, month=curr_month)

    def create_payment(self, employee: Employee, month: month.Month):
        if Payment.objects.filter(employee=employee, month=month).exists():
            return False
        salary = Salary.objects.create(
            basic_salary=employee.salary.basic_salary, allowances=employee.salary.allowances, overtimes=employee.salary.overtimes, deductions=employee.salary.deductions)
        salary.save()
        now = date.today()
        payment = Payment.objects.create(
            salary=salary,
            employee=employee,
            month=month.Month(now.year, now.month)
        )
        payment = Payment.objects.create(
            employee=employee, month=month, salary=employee.salary)
        payment.save()
        return True