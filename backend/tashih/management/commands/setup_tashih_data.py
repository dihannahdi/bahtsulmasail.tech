from django.core.management.base import BaseCommand
from tashih.models import VerificationStatus


class Command(BaseCommand):
    help = 'Set up initial verification statuses for the Tashih workflow'

    def handle(self, *args, **options):
        self.stdout.write('Setting up initial Tashih verification statuses...')

        # Create verification statuses
        statuses = [
            {
                'name': 'Pending Review',
                'description': 'TaqrirKhass or TaqrirJamai is pending review',
                'order': 1,
                'is_final': False
            },
            {
                'name': 'Under Review',
                'description': 'TaqrirKhass or TaqrirJamai is currently being reviewed',
                'order': 2,
                'is_final': False
            },
            {
                'name': 'Approved',
                'description': 'TaqrirKhass or TaqrirJamai has been approved',
                'order': 3,
                'is_final': True
            },
            {
                'name': 'Rejected',
                'description': 'TaqrirKhass or TaqrirJamai has been rejected',
                'order': 4,
                'is_final': True
            },
            {
                'name': 'Needs Revision',
                'description': 'TaqrirKhass or TaqrirJamai needs revision',
                'order': 5,
                'is_final': True
            },
            {
                'name': 'Verified',
                'description': 'Document has been verified through the Tashih workflow',
                'order': 6,
                'is_final': True
            }
        ]

        created_count = 0
        for status_data in statuses:
            status, created = VerificationStatus.objects.get_or_create(
                name=status_data['name'],
                defaults=status_data
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created verification status: {status.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Verification status already exists: {status.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully set up Tashih data. Created {created_count} new verification statuses.'
            )
        ) 