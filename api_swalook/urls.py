"""api_swalook URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from _api_.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('update_file/', update_files_pull.as_view()),
    path("restart_server/", restart_server.as_view()),
    # path('swalook_token_ii091/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('swalook_token_ii091/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
    path('api/swalook/endpoints/',showendpoint.as_view()),
    path('api/swalook/create_account/',VendorSignin.as_view()),
    path('api/swalook/login/',vendor_login.as_view()),
    path('api/swalook/billing/',vendor_billing.as_view()),
    path('api/swalook/appointment/',VendorAppointments.as_view()),
    path('api/swalook/edit/appointment/<id>/',edit_appointment.as_view()),
    path('api/swalook/delete/appointment/<id>/',delete_appointment.as_view()),
    path('api/swalook/preset-day-appointment/',present_day_appointment.as_view()),
    path('api/swalook/services/',VendorServices.as_view()),
    path('api/swalook/add/services/',Add_vendor_service.as_view()),
    path('api/swalook/table/services/',Table_service.as_view()),
    path('api/swalook/edit/services/<id>/',Edit_service.as_view()),
    path('api/swalook/delete/services/<id>/',Delete_service.as_view()),
    path('api/swalook/get_specific/appointment/<id>/',get_specific_appointment.as_view()),
 






    
    
    
    

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
