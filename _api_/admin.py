from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Vendor_Service)
admin.site.register(VendorAppointment)
admin.site.register(VendorInvoice)
admin.site.register(VendorStaff)
admin.site.register(SwalookUserProfile)