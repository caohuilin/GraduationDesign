import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        filename = './handler/db.go'
        with open(filename) as f:
            self.assertEqual(f.read().find('json'), -1)

if __name__ == '__main__':
    unittest.main()
